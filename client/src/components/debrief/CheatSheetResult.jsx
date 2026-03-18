import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../common/Toast';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export function CheatSheetResult({ cheatSheet, onReset }) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { sheetUrl } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cheatSheet);
      setCopied(true);
      showToast(t('debrief.copySuccess'), 'success');
    } catch (err) {
      showToast(t('common.error'), 'error');
    }
  };

  return (
    <div className="mb-6">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {t('debrief.cheatSheetTitle')}
        </h3>
        <div className="prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans bg-transparent p-0">
            {cheatSheet}
          </pre>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          {t('debrief.generatedBy')}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          disabled={copied}
          className={`flex-1 py-2.5 rounded-lg font-medium transition-colors ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-teal-600 text-white hover:bg-teal-700'
          }`}
        >
          {copied ? '✓ ' : ''}{t('debrief.copyCheatSheet')}
        </button>
        <button
          onClick={onReset}
          className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          New
        </button>
      </div>
    </div>
  );
}
