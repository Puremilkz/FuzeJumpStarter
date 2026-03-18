import { useLanguage } from '../../context/LanguageContext';

const TASK_ICONS = {
  clientEmail: '📧',
  internalMemo: '📝',
  docSummary: '📄',
  reportSection: '📊',
  meetingFollowUp: '📅',
  custom: '✨',
};

export function TaskCards({ selectedTask, onSelect }) {
  const { t } = useLanguage();
  const taskTypes = ['clientEmail', 'internalMemo', 'docSummary', 'reportSection', 'meetingFollowUp', 'custom'];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        {t('jumpstart.step1Title')}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {taskTypes.map((taskId) => (
          <button
            key={taskId}
            onClick={() => onSelect(taskId)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              selectedTask === taskId
                ? 'border-teal-600 bg-teal-50'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <span className="text-2xl mb-2 block">{TASK_ICONS[taskId]}</span>
            <span className={`text-sm font-medium ${
              selectedTask === taskId ? 'text-teal-700' : 'text-gray-700'
            }`}>
              {t(`jumpstart.taskTypes.${taskId}`)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
