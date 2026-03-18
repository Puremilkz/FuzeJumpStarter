const express = require('express');
const router = express.Router();

const ADMIN_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1Ua4rmPL8-Rk63WLhKyrCr4QcAfcR8hctzFhlFK-mV3Y/edit';

router.post('/validate', async (req, res) => {
  try {
    const { companyCode } = req.body;

    if (!companyCode) {
      return res.status(400).json({ error: 'Company code is required' });
    }

    const normalizedCode = companyCode.toUpperCase().trim();

    try {
      const { readSheet } = require('../services/sheets');
      const data = await readSheet(ADMIN_SHEET_URL, 'A1:C100');
      
      if (data && data.length >= 2) {
        const headers = data[0].map(h => h.toLowerCase().trim());
        const codeIndex = headers.indexOf('companycode');
        const nameIndex = headers.indexOf('companyname');

        if (codeIndex !== -1) {
          for (let i = 1; i < data.length; i++) {
            const row = data[i];
            if (row[codeIndex]?.toUpperCase().trim() === normalizedCode) {
              return res.json({
                valid: true,
                companyCode: row[codeIndex],
                companyName: nameIndex !== -1 ? row[nameIndex] : null,
                source: 'admin'
              });
            }
          }
        }
      }
    } catch (sheetError) {
      console.error('Failed to read admin sheet:', sheetError.message);
      return res.status(500).json({ error: 'Failed to validate. Please try again.' });
    }

    res.status(401).json({ error: 'Invalid company code' });
  } catch (error) {
    console.error('Auth validation error:', error.message);
    res.status(500).json({ error: 'Validation failed. Please check your company code.' });
  }
});

module.exports = router;
