const axios = require('axios');
const { GoogleAuth } = require('google-auth-library');

const extractSheetId = (url) => {
  const patterns = [
    /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/,
    /\/d\/([a-zA-Z0-9-_]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

let auth = null;
let authInitialized = false;

const initAuth = async () => {
  if (authInitialized) return auth;
  
  const keyFile = process.env.GOOGLE_SHEETS_KEY_FILE || 'sheets-key.json';
  
  try {
    auth = new GoogleAuth({
      keyFile: keyFile,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    authInitialized = true;
    console.log('Google Sheets auth initialized with service account');
    return auth;
  } catch (error) {
    console.log('Service account auth not configured:', error.message);
    return null;
  }
};

const getAccessToken = async () => {
  const googleAuth = await initAuth();
  if (!googleAuth) return null;
  
  try {
    const client = await googleAuth.getClient();
    const tokenResponse = await client.getAccessToken();
    return tokenResponse.token;
  } catch (error) {
    console.error('Failed to get access token:', error.message);
    return null;
  }
};

const getSheetService = (sheetUrl) => {
  const sheetId = extractSheetId(sheetUrl);
  if (!sheetId) throw new Error('Invalid Google Sheet URL');
  return { sheetId };
};

const readSheet = async (sheetUrl, range = 'A1:Z100') => {
  const token = await getAccessToken();
  if (!token) throw new Error('Google Sheets not configured');
  
  const { sheetId } = getSheetService(sheetUrl);
  const response = await axios.get(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { majorDimension: 'ROWS' },
    }
  );
  return response.data.values || [];
};

const writeToSheet = async (sheetUrl, range, values) => {
  const token = await getAccessToken();
  if (!token) throw new Error('Google Sheets not configured');
  
  const { sheetId } = getSheetService(sheetUrl);
  const data = Array.isArray(values[0]) ? values : [values];
  
  await axios.put(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}`,
    { values: data },
    { 
      headers: { Authorization: `Bearer ${token}` },
      params: { valueInputOption: 'RAW' }
    }
  );
};

const appendToSheet = async (sheetUrl, range, values) => {
  const token = await getAccessToken();
  if (!token) throw new Error('Google Sheets not configured');
  
  const { sheetId } = getSheetService(sheetUrl);
  const data = Array.isArray(values[0]) ? values : [values];
  
  await axios.post(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}:append`,
    { values: data, majorDimension: 'ROWS' },
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { valueInputOption: 'RAW' },
    }
  );
};

const validateSheetAccess = async (sheetUrl) => {
  try {
    const token = await getAccessToken();
    if (!token) return { valid: false, error: 'Not configured' };
    
    const { sheetId } = getSheetService(sheetUrl);
    const response = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { valid: true, title: response.data.properties?.title };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

const ensureSheetsExist = async (sheetUrl) => {
  const token = await getAccessToken();
  if (!token) throw new Error('Google Sheets not configured');
  
  const { sheetId } = getSheetService(sheetUrl);
  
  try {
    const meta = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const sheets = meta.data.sheets || [];
    const sheetNames = sheets.map(s => s.properties.title);
    
    for (const name of ['Usage Log', 'Debriefs']) {
      if (!sheetNames.includes(name)) {
        await axios.post(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`,
          {
            requests: [{
              addSheet: {
                properties: { title: name }
              }
            }]
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      
      const headerRange = name === 'Usage Log' ? 'A1:E1' : 'A1:D1';
      const headerData = name === 'Usage Log' 
        ? [['Timestamp', 'Task Type', 'Language', 'Anonymised', 'Confirmed']]
        : [['Timestamp', 'Title', 'Type', 'Cheat Sheet Content']];
      
      try {
        const existing = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(name + '!' + headerRange)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (!existing.data.values || existing.data.values.length === 0) {
          await axios.put(
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(name + '!' + headerRange)}`,
            { values: headerData },
            { 
              headers: { Authorization: `Bearer ${token}` },
              params: { valueInputOption: 'RAW' }
            }
          );
        }
      } catch (headerErr) {
        console.log('Header check skipped for', name);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error ensuring sheets exist:', error.message);
    throw error;
  }
};

module.exports = {
  extractSheetId,
  readSheet,
  writeToSheet,
  appendToSheet,
  validateSheetAccess,
  ensureSheetsExist,
  initAuth,
};
