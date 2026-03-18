const express = require('express');
const router = express.Router();
const { validateSheetAccess, ensureSheetsExist } = require('../services/sheets');

router.post('/connect', async (req, res) => {
  try {
    const { sheetUrl } = req.body;

    if (!sheetUrl) {
      return res.status(400).json({ error: 'Sheet URL is required' });
    }

    const validation = await validateSheetAccess(sheetUrl);
    
    if (!validation.valid) {
      return res.status(400).json({ 
        error: 'Could not access the sheet. Make sure it\'s set to "Anyone with link can edit".',
        details: validation.error,
      });
    }

    await ensureSheetsExist(sheetUrl);

    res.json({ 
      success: true, 
      title: validation.title,
    });
  } catch (error) {
    console.error('Setup connect error:', error);
    res.status(500).json({ 
      error: 'Failed to connect to sheet. Please verify the URL and sharing settings.',
    });
  }
});

router.get('/health', async (req, res) => {
  const { checkOllama } = require('../services/ollama');
  const health = await checkOllama();
  res.json({
    server: 'ok',
    ollama: health,
  });
});

module.exports = router;
