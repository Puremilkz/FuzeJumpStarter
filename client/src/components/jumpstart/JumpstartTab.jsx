import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../common/Toast';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { TaskCards, PromptForm, PromptResult, FairCounter } from '../jumpstart';
import api from '../../services/api';

export function JumpstartTab() {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [selectedTask, setSelectedTask] = useState(null);
  const [tone, setTone] = useState('neutral');
  const [language, setLanguage] = useState('en');
  const [context, setContext] = useState('');
  const [anonymised, setAnonymised] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const handleGenerate = async () => {
    if (!context.trim()) return;

    setIsGenerating(true);
    try {
      const result = await api.generatePrompt(selectedTask, context, tone, language);
      
      if (result.success) {
        setGeneratedPrompt(result.prompt);
      } else {
        showToast(result.error || t('common.error'), 'error');
      }
    } catch (err) {
      showToast(t('common.error'), 'error');
    }
    setIsGenerating(false);
  };

  const handleReset = () => {
    setGeneratedPrompt('');
    setContext('');
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <TaskCards
        selectedTask={selectedTask}
        onSelect={setSelectedTask}
      />

      {selectedTask && (
        <PromptForm
          tone={tone}
          onToneChange={setTone}
          language={language}
          onLanguageChange={setLanguage}
          context={context}
          onContextChange={setContext}
          anonymised={anonymised}
          onAnonymisedChange={setAnonymised}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      )}

      {isGenerating && (
        <div className="mb-6">
          <LoadingSpinner />
          <p className="text-center text-sm text-gray-500">{t('jumpstart.generating')}</p>
        </div>
      )}

      {generatedPrompt && (
        <PromptResult
          prompt={generatedPrompt}
          taskType={selectedTask}
          language={language}
          onReset={handleReset}
        />
      )}

      <FairCounter />
    </div>
  );
}
