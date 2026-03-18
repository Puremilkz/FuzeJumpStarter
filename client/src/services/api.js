const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = {
  async authValidate(companyCode, sheetUrl) {
    const response = await fetch(`${API_BASE}/auth/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyCode, sheetUrl }),
    });
    return response.json();
  },

  async setupConnect(sheetUrl) {
    const response = await fetch(`${API_BASE}/setup/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sheetUrl }),
    });
    return response.json();
  },

  async setupHealth() {
    const response = await fetch(`${API_BASE}/setup/health`);
    return response.json();
  },

  async generatePrompt(taskType, context, tone, language) {
    const response = await fetch(`${API_BASE}/jumpstart/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskType, context, tone, language }),
    });
    return response.json();
  },

  async logUsage(sheetUrl, taskType, language, anonymised) {
    const response = await fetch(`${API_BASE}/usage/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sheetUrl, taskType, language, anonymised }),
    });
    return response.json();
  },

  async getWeeklyCount(sheetUrl) {
    const response = await fetch(`${API_BASE}/usage/weekly-count?sheetUrl=${encodeURIComponent(sheetUrl)}`);
    return response.json();
  },

  async generateDebrief(documentText, documentType, language, sheetUrl, title) {
    const response = await fetch(`${API_BASE}/debrief/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentText, documentType, language, sheetUrl, title }),
    });
    return response.json();
  },

  async saveDebrief(sheetUrl, title, documentType, cheatSheetContent) {
    const response = await fetch(`${API_BASE}/debrief/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sheetUrl, title, documentType, cheatSheetContent }),
    });
    return response.json();
  },

  async getDebriefHistory(sheetUrl) {
    const response = await fetch(`${API_BASE}/debrief/history?sheetUrl=${encodeURIComponent(sheetUrl)}`);
    return response.json();
  },
};

export default api;
