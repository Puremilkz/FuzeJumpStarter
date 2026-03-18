const templates = {
  clientEmail: {
    en: `You are a professional business assistant. Help me draft a reply to a client email.

Context/Original email:
{context}

Requirements:
- Tone: {tone}
- Language: {language}
- Maintain a professional and helpful tone
- Address all points from the original email
- Keep the response concise but complete
- If further action is needed, suggest next steps politely

Draft a response email:`,

    'zh-s': `你是一位专业的商务助理。请帮我起草一封回复客户邮件的邮件。

背景/原始邮件：
{context}

要求：
- 语气：{tone}
- 语言：{language}
- 保持专业且乐于助人的语气
- 回应原始邮件中的所有要点
- 保持回复简洁但完整
- 如果需要进一步行动，请礼貌地建议后续步骤

起草回复邮件：`,

    'zh-t': `你是一位專業的商務助理。請幫我起草一封回覆客戶郵件的郵件。

背景/原始郵件：
{context}

要求：
- 語氣：{tone}
- 語言：{language}
- 保持專業且樂於助人的語氣
- 回應原始郵件中的所有要點
- 保持回覆簡潔但完整
- 如果需要進一步行動，請禮貌地建議後續步驟

起草回覆郵件：`,
  },

  internalMemo: {
    en: `You are a professional corporate communications assistant. Help me draft an internal memo/announcement.

Context/Notes:
{context}

Requirements:
- Tone: {tone}
- Language: {language}
- Clear, concise, and action-oriented
- Structure: Purpose → Key Information → Action Required (if any)
- Keep it scannable with bullet points where appropriate
- Professional but approachable tone

Draft the internal memo:`,

    'zh-s': `你是一位专业的企业沟通助理。请帮我起草一份内部备忘录/公告。

背景/笔记：
{context}

要求：
- 语气：{tone}
- 语言：{language}
- 清晰、简洁、以行动为导向
- 结构：目的 → 关键信息 → 需要采取的行动（如有）
- 在适当的地方使用要点以便于浏览
- 专业但亲切的语气

起草内部备忘录：`,

    'zh-t': `你是一位專業的企業溝通助理。請幫我起草一份內部備忘錄/公告。

背景/筆記：
{context}

要求：
- 語氣：{tone}
- 語言：{language}
- 清晰、簡潔、以行動為導向
- 結構：目的 → 關鍵資訊 → 需要採取的行動（如有）
- 在適當的地方使用要點以便於瀏覽
- 專業但親切的語氣

起草內部備忘錄：`,
  },

  docSummary: {
    en: `You are a professional document analyst. Summarize the following document concisely.

Document:
{context}

Requirements:
- Language: {language}
- Extract the main points and key takeaways
- Keep it brief (3-5 sentences or bullet points)
- Maintain accuracy and avoid speculation
- Highlight any important dates, numbers, or action items

Provide a clear summary:`,

    'zh-s': `你是一位专业的文档分析师。请简洁地总结以下文档。

文档：
{context}

要求：
- 语言：{language}
- 提取主要观点和关键要点
- 保持简洁（3-5句话或要点）
- 保持准确性，避免推测
- 突出显示任何重要的日期、数字或行动项目

提供清晰的摘要：`,

    'zh-t': `你是一位專業的文件分析師。請簡潔地總結以下文件。

文件：
{context}

要求：
- 語言：{language}
- 提取主要觀點和關鍵要點
- 保持簡潔（3-5句話或要點）
- 保持準確性，避免推測
- 突出顯示任何重要的日期、數字或行動項目

提供清晰的摘要：`,
  },

  reportSection: {
    en: `You are a professional report writer. Help me draft a section of a report.

Context/Notes:
{context}

Requirements:
- Tone: {tone}
- Language: {language}
- Professional and data-driven
- Clear structure with appropriate headings
- Support points with evidence where available
- Follow standard business report conventions

Draft the report section:`,

    'zh-s': `你是一位专业的报告撰写人。请帮我起草一份报告的一个章节。

背景/笔记：
{context}

要求：
- 语气：{tone}
- 语言：{language}
- 专业且以数据为导向
- 清晰的结构和适当的标题
- 在可用的情况下用证据支持观点
- 遵循标准商业报告惯例

起草报告章节：`,

    'zh-t': `你是一位專業的報告撰寫人。請幫我起草一份報告的一個章節。

背景/筆記：
{context}

要求：
- 語氣：{tone}
- 語言：{language}
- 專業且以數據為導向
- 清晰的結構和適當的標題
- 在可用的情況下用證據支持觀點
- 遵循標準商業報告慣例

起草報告章節：`,
  },

  meetingFollowUp: {
    en: `You are a professional business assistant. Help me draft a follow-up email after a meeting.

Meeting notes:
{context}

Requirements:
- Tone: {tone}
- Language: {language}
- Include: key decisions made, action items with owners, next steps
- Be specific about timelines and responsibilities
- Professional and clear
- Thank participants appropriately

Draft the follow-up email:`,

    'zh-s': `你是一位专业的商务助理。请帮我起草一封会议后续邮件。

会议笔记：
{context}

要求：
- 语气：{tone}
- 语言：{language}
- 包括：做出的关键决策、带负责人的行动项目、下一步骤
- 具体说明时间表和责任
- 专业且清晰
- 适当表示感谢

起草后续邮件：`,

    'zh-t': `你是一位專業的商務助理。請幫我起草一封會議後續郵件。

會議筆記：
{context}

要求：
- 語氣：{tone}
- 語言：{language}
- 包括：做出的關鍵決策、带負責人的行動項目、下一步驟
- 具體說明時間表和責任
- 專業且清晰
- 適當表示感謝

起草後續郵件：`,
  },

  custom: {
    en: `Help me with the following task:

Context:
{context}

Requirements:
- Tone: {tone}
- Language: {language}
- Complete the task professionally

Task description and expected output:`,

    'zh-s': `请帮我完成以下任务：

背景：
{context}

要求：
- 语气：{tone}
- 语言：{language}
- 专业地完成任务

任务描述和预期输出：`,

    'zh-t': `請幫我完成以下任務：

背景：
{context}

要求：
- 語氣：{tone}
- 語言：{language}
- 專業地完成任務

任務描述和預期輸出：`,
  },
};

const buildPrompt = (taskType, context, tone, language) => {
  const template = templates[taskType] || templates.custom;
  const lang = ['en', 'zh-s', 'zh-t'].includes(language) ? language : 'en';
  const toneMap = {
    neutral: { en: 'Neutral', 'zh-s': '中立', 'zh-t': '中立' },
    friendly: { en: 'Friendly', 'zh-s': '友好', 'zh-t': '友好' },
    formal: { en: 'Formal', 'zh-s': '正式', 'zh-t': '正式' },
    apologetic: { en: 'Apologetic', 'zh-s': '道歉', 'zh-t': '道歉' },
  };
  const languageMap = {
    en: 'English',
    'zh-s': '简体中文',
    'zh-t': '繁體中文',
  };

  const promptTemplate = template[lang] || template.en;
  return promptTemplate
    .replace('{context}', context)
    .replace(/{tone}/g, toneMap[tone]?.[lang] || toneMap[tone]?.en || tone)
    .replace(/{language}/g, languageMap[lang] || language);
};

const TASK_TYPES = [
  { id: 'clientEmail', icon: '📧', defaultTone: 'formal' },
  { id: 'internalMemo', icon: '📝', defaultTone: 'neutral' },
  { id: 'docSummary', icon: '📄', defaultTone: 'neutral' },
  { id: 'reportSection', icon: '📊', defaultTone: 'formal' },
  { id: 'meetingFollowUp', icon: '📅', defaultTone: 'friendly' },
  { id: 'custom', icon: '✨', defaultTone: 'neutral' },
];

const TONES = ['neutral', 'friendly', 'formal', 'apologetic'];
const LANGUAGES = ['en', 'zh-s', 'zh-t'];

module.exports = {
  templates,
  buildPrompt,
  TASK_TYPES,
  TONES,
  LANGUAGES,
};
