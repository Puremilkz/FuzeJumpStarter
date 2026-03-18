const express = require('express');
const router = express.Router();
const { appendToSheet, readSheet, writeToSheet } = require('../services/sheets');
const { generateDebrief, checkHealth } = require('../services/ollama');

router.post('/generate', async (req, res) => {
  try {
    const { documentText, documentType, language, sheetUrl, title } = req.body;

    if (!documentText || documentText.trim().length === 0) {
      return res.status(400).json({ error: 'Document text is required' });
    }

    if (documentText.length > 10000) {
      return res.status(400).json({ error: 'Document text is too long. Please limit to 10,000 characters.' });
    }

    const health = await checkHealth();
    if (!health.healthy) {
      return res.status(503).json({ 
        error: 'AI service is currently unavailable. Please try again later.' 
      });
    }

    const result = await generateDebrief(documentText, documentType, language || 'en');

    if (!result.success) {
      return res.status(500).json({ error: 'Failed to generate cheat-sheet. Please try again.' });
    }

    res.json({
      success: true,
      cheatSheet: result.response,
    });
  } catch (error) {
    console.error('Debrief generate error:', error);
    res.status(500).json({ error: 'Failed to generate cheat-sheet' });
  }
});

router.post('/save', async (req, res) => {
  try {
    const { sheetUrl, title, documentType, cheatSheetContent } = req.body;

    if (!sheetUrl) {
      return res.status(400).json({ error: 'Sheet URL is required' });
    }

    const timestamp = new Date().toISOString();
    await appendToSheet(sheetUrl, 'Debriefs!A:A', [[timestamp]]);
    
    const rowNum = (await readSheet(sheetUrl, 'Debriefs!A:A')).length;
    await writeToSheet(sheetUrl, `Debriefs!B${rowNum}:D${rowNum}`, [[
      title || 'Untitled',
      documentType || 'Other',
      cheatSheetContent || '',
    ]]);

    res.json({ success: true });
  } catch (error) {
    console.error('Debrief save error:', error);
    res.status(500).json({ error: 'Failed to save debrief' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const { sheetUrl } = req.query;

    if (!sheetUrl) {
      return res.status(400).json({ error: 'Sheet URL is required' });
    }

    const data = await readSheet(sheetUrl, 'Debriefs!A1:D100');
    
    if (!data || data.length < 2) {
      return res.json({ debriefs: [] });
    }

    const headers = data[0];
    const debriefs = data.slice(1).map(row => ({
      timestamp: row[0] || '',
      title: row[1] || 'Untitled',
      type: row[2] || 'Other',
      content: row[3] || '',
    }));

    res.json({ debriefs: debriefs.reverse() });
  } catch (error) {
    console.error('Debrief history error:', error);
    res.status(500).json({ error: 'Failed to fetch debrief history' });
  }
});

module.exports = router;
