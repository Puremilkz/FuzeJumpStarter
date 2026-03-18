import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { DebriefForm, CheatSheetResult, HistoryList } from '../debrief';
import api from '../../services/api';

export function DebriefTab() {
  const { t, language } = useLanguage();
  const { sheetUrl } = useAuth();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [documentType, setDocumentType] = useState('proposal');
  const [documentText, setDocumentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cheatSheet, setCheatSheet] = useState('');

  const handleSubmit = async () => {
    if (!documentText.trim()) return;

    setIsSubmitting(true);
    try {
      const result = await api.generateDebrief(
        documentText,
        documentType,
        language,
        sheetUrl,
        title
      );

      if (result.success) {
        setCheatSheet(result.cheatSheet);
        
        if (sheetUrl) {
          try {
            await api.saveDebrief(sheetUrl, title, documentType, result.cheatSheet);
          } catch (saveErr) {
            console.log('Debrief save skipped');
          }
        }
      } else {
        showToast(result.error || t('common.error'), 'error');
      }
    } catch (err) {
      showToast(t('common.error'), 'error');
    }
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setCheatSheet('');
    setTitle('');
    setDocumentText('');
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <DebriefForm
        title={title}
        onTitleChange={setTitle}
        documentType={documentType}
        onDocumentTypeChange={setDocumentType}
        documentText={documentText}
        onDocumentTextChange={setDocumentText}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      {isSubmitting && (
        <div className="mb-6">
          <LoadingSpinner />
          <p className="text-center text-sm text-gray-500">{t('debrief.creating')}</p>
        </div>
      )}

      {cheatSheet && !isSubmitting && (
        <CheatSheetResult
          cheatSheet={cheatSheet}
          onReset={handleReset}
        />
      )}

      <HistoryList />
    </div>
  );
}
