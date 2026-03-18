const express = require('express');
const router = express.Router();
const { appendToSheet, readSheet } = require('../services/sheets');

const HEADERS = ['Timestamp', 'Task Type', 'Language', 'Anonymised', 'Confirmed'];

const ensureHeaders = async (sheetUrl) => {
  try {
    const data = await readSheet(sheetUrl, 'Usage Log!A1:E1');
    const isEmpty = !data || data.length === 0 || !data[0] || !data[0][0];
    const hasHeaders = data && data[0] && data[0][0] === 'Timestamp';
    
    if (isEmpty || !hasHeaders) {
      const { writeToSheet } = require('../services/sheets');
      await writeToSheet(sheetUrl, 'Usage Log!A1:E1', [HEADERS]);
    }
  } catch (error) {
    console.log('Header check error:', error.message);
  }
};

router.post('/log', async (req, res) => {
  try {
    const { sheetUrl, taskType, language, anonymised } = req.body;

    if (!sheetUrl) {
      return res.status(400).json({ error: 'Sheet URL is required' });
    }

    await ensureHeaders(sheetUrl);

    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      taskType || 'unknown',
      language || 'en',
      anonymised ? 'Yes' : 'No',
      'Yes',
    ];

    await appendToSheet(sheetUrl, 'Usage Log!A:E', row);

    res.json({ success: true });
  } catch (error) {
    console.error('Usage log error:', error);
    res.status(500).json({ error: 'Failed to log usage' });
  }
});

router.get('/weekly-count', async (req, res) => {
  try {
    const { sheetUrl } = req.query;

    if (!sheetUrl) {
      return res.status(400).json({ error: 'Sheet URL is required' });
    }

    const data = await readSheet(sheetUrl, 'Usage Log!A1:A100');

    if (!data || data.length < 2) {
      return res.json({ count: 0 });
    }

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    let count = 0;
    for (let i = 1; i < data.length; i++) {
      try {
        const rowTimestamp = new Date(data[i][0]);
        if (rowTimestamp >= oneWeekAgo) {
          count++;
        }
      } catch (e) {
        continue;
      }
    }

    res.json({ count });
  } catch (error) {
    console.error('Weekly count error:', error);
    res.status(500).json({ error: 'Failed to get weekly count' });
  }
});

module.exports = router;
