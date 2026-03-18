import { useLanguage } from '../../context/LanguageContext';

export function PromptForm({ 
  tone, 
  onToneChange, 
  language, 
  onLanguageChange,
  context, 
  onContextChange,
  anonymised, 
  onAnonymisedChange,
  onGenerate,
  isGenerating,
}) {
  const { t } = useLanguage();
  const tones = ['neutral', 'friendly', 'formal', 'apologetic'];
  const languages = ['en', 'zh-s', 'zh-t'];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        {t('jumpstart.step2Title')}
      </h2>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('jumpstart.tone')}
            </label>
            <select
              value={tone}
              onChange={(e) => onToneChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {tones.map((toneOption) => (
                <option key={toneOption} value={toneOption}>
                  {t(`jumpstart.toneOptions.${toneOption}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('jumpstart.outputLanguage')}
            </label>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {t(`languages.${lang}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('jumpstart.contextLabel')}
          </label>
          <textarea
            value={context}
            onChange={(e) => onContextChange(e.target.value)}
            placeholder={t('jumpstart.contextPlaceholder')}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={anonymised}
              onChange={(e) => onAnonymisedChange(e.target.checked)}
              className="mt-1 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className="text-sm text-gray-600">
              {t('jumpstart.anonymised')}
            </span>
          </label>
          {!anonymised && (
            <p className="text-xs text-amber-600 mt-1 ml-6">
              {t('jumpstart.anonymisedWarning')}
            </p>
          )}
        </div>

        <button
          onClick={onGenerate}
          disabled={!context.trim() || isGenerating}
          className="w-full py-2.5 bg-teal-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors"
        >
          {isGenerating ? t('jumpstart.generating') : t('jumpstart.generatePrompt')}
        </button>
      </div>
    </div>
  );
}
