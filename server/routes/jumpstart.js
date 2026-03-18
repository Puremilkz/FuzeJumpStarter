const express = require('express');
const router = express.Router();
const { buildPrompt, TASK_TYPES, TONES, LANGUAGES } = require('../prompts/templates');

const FORBIDDEN_PATTERNS = [
  /\b[A-Z]{2}\d{6}\([A-Z]\)\b/i,
  /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/,
  /\b\d{6}\b/,
];

const containsForbiddenData = (text) => {
  return FORBIDDEN_PATTERNS.some(pattern => pattern.test(text));
};

router.post('/generate', (req, res) => {
  try {
    const { taskType, context, tone, language } = req.body;

    if (!taskType) {
      return res.status(400).json({ error: 'Task type is required' });
    }

    if (!TASK_TYPES.find(t => t.id === taskType)) {
      return res.status(400).json({ error: 'Invalid task type' });
    }

    if (!context || context.trim().length === 0) {
      return res.status(400).json({ error: 'Context is required' });
    }

    const validTone = TONES.includes(tone) ? tone : 'neutral';
    const validLanguage = LANGUAGES.includes(language) ? language : 'en';

    const prompt = buildPrompt(taskType, context, validTone, validLanguage);
    const containsForbidden = containsForbiddenData(context);

    res.json({
      success: true,
      prompt,
      warning: containsForbidden ? 'Please review the context for sensitive data' : null,
    });
  } catch (error) {
    console.error('Generate error:', error);
    res.status(500).json({ error: 'Failed to generate prompt' });
  }
});

router.get('/task-types', (req, res) => {
  res.json({ taskTypes: TASK_TYPES });
});

router.get('/options', (req, res) => {
  res.json({
    tones: TONES,
    languages: LANGUAGES,
  });
});

module.exports = router;
