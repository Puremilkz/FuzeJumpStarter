import { useLanguage } from '../../context/LanguageContext';

export function Tabs({ activeTab, onTabChange }) {
  const { t } = useLanguage();

  const tabs = [
    { id: 'jumpstart', label: t('tabs.jumpstart') },
    { id: 'debrief', label: t('tabs.debrief') },
  ];

  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors relative ${
            activeTab === tab.id
              ? 'text-teal-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
          )}
        </button>
      ))}
    </div>
  );
}
