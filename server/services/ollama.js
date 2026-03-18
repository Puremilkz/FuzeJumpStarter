const axios = require('axios');

const OLLAMA_URL = process.env.OLLAMA_URL || 'https://ollama.com/api';
const DEFAULT_MODEL = process.env.DEFAULT_MODEL || 'qwen2.5:7b';
const OLLAMA_API_KEY = process.env.OLLAMA_API_KEY || '';

const ollamaApi = axios.create({
  baseURL: OLLAMA_URL,
  timeout: 120000,
  headers: OLLAMA_API_KEY ? { 'Authorization': `Bearer ${OLLAMA_API_KEY}` } : {},
});

const checkHealth = async () => {
  try {
    const response = await ollamaApi.get('/api/tags');
    return { healthy: true, models: response.data.models || [] };
  } catch (error) {
    return { healthy: false, error: error.message };
  }
};

const generate = async (prompt, model = DEFAULT_MODEL) => {
  try {
    const response = await ollamaApi.post('/api/generate', {
      model,
      prompt,
      stream: false,
    });
    return { success: true, response: response.data.response };
  } catch (error) {
    console.error('Ollama generation error:', error.message);
    return { success: false, error: error.message };
  }
};

const generateDebrief = async (documentText, documentType, language = 'en') => {
  const langPrompt = language === 'zh-s' ? 'Simplified Chinese' : language === 'zh-t' ? 'Traditional Chinese' : 'English';
  
  const prompt = `You are a professional document analyst. Analyze the following ${documentType || 'document'} and create a concise cheat-sheet.

Language for response: ${langPrompt}

Document:
${documentText}

Create a structured cheat-sheet with:

KEY POINTS:
- 3-5 main takeaways from the document
- Be specific and actionable

QUESTIONS/RISKS TO WATCH:
- 2-3 potential questions or risks someone should be aware of
- Consider compliance, timing, dependencies

Format your response clearly with headers. Keep it concise and scannable.`;

  const result = await generate(prompt);
  return result;
};

module.exports = {
  checkHealth,
  generate,
  generateDebrief,
  OLLAMA_URL,
  DEFAULT_MODEL,
};
