import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export function DebriefForm({
  title,
  onTitleChange,
  documentType,
  onDocumentTypeChange,
  documentText,
  onDocumentTextChange,
  onSubmit,
  isSubmitting,
}) {
  const { t } = useLanguage();
  const docTypes = ['proposal', 'policy', 'report', 'email', 'other'];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        {t('debrief.title')}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('debrief.documentTitle')}
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder={t('debrief.documentTitlePlaceholder')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('debrief.documentType')}
          </label>
          <select
            value={documentType}
            onChange={(e) => onDocumentTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            {docTypes.map((type) => (
              <option key={type} value={type}>
                {t(`debrief.typeOptions.${type}`)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('debrief.documentTextLabel')}
          </label>
          <textarea
            value={documentText}
            onChange={(e) => onDocumentTextChange(e.target.value)}
            placeholder={t('debrief.documentTextPlaceholder')}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            {t('debrief.documentTextTip')}
          </p>
        </div>

        <button
          onClick={onSubmit}
          disabled={!documentText.trim() || isSubmitting}
          className="w-full py-2.5 bg-teal-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors"
        >
          {isSubmitting ? t('debrief.creating') : t('debrief.createCheatSheet')}
        </button>
      </div>
    </div>
  );
}
