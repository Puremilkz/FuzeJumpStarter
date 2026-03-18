import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../common/Toast';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export function PromptResult({ prompt, taskType, language, onReset }) {
  const { t } = useLanguage();
  const { sheetUrl } = useAuth();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      showToast(t('jumpstart.copySuccess'), 'success');
      
      if (sheetUrl) {
        try {
          await api.logUsage(sheetUrl, taskType, language, true);
        } catch (logErr) {
          console.log('Usage logging skipped (no sheet configured)');
        }
      }
    } catch (err) {
      showToast(t('common.error'), 'error');
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        {t('jumpstart.step3Title')}
      </h2>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
        <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
          {prompt}
        </pre>
      </div>

      <p className="text-xs text-gray-500 mb-4">
        {t('jumpstart.promptHelperText')}
      </p>

      <button
        onClick={handleCopy}
        disabled={copied}
        className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
          copied
            ? 'bg-green-600 text-white'
            : 'bg-teal-600 text-white hover:bg-teal-700'
        }`}
      >
        {copied ? '✓ ' : ''}{t('jumpstart.copyAndConfirm')}
      </button>
    </div>
  );
}
