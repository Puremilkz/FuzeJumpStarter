import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export function HistoryList() {
  const { t } = useLanguage();
  const { sheetUrl } = useAuth();
  const [debriefs, setDebriefs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!sheetUrl) return;
      try {
        const result = await api.getDebriefHistory(sheetUrl);
        setDebriefs(result.debriefs || []);
      } catch (err) {
        console.error('Failed to fetch history');
      }
      setIsLoading(false);
    };

    fetchHistory();
  }, [sheetUrl]);

  const filteredDebriefs = debriefs.filter((d) =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center py-4 text-gray-500">{t('common.loading')}</div>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {t('debrief.historyTitle')}
      </h3>

      {debriefs.length > 0 && (
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('debrief.historySearchPlaceholder')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      )}

      {filteredDebriefs.length === 0 ? (
        <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4 text-center">
          {debriefs.length === 0 ? t('debrief.historyEmpty') : 'No results found'}
        </p>
      ) : (
        <div className="space-y-3">
          {filteredDebriefs.map((debrief, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expandedId === index ? null : index)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{debrief.title}</p>
                  <p className="text-xs text-gray-500">
                    {debrief.type} • {new Date(debrief.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-gray-400">
                  {expandedId === index ? '▲' : '▼'}
                </span>
              </button>
              {expandedId === index && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <pre className="mt-3 whitespace-pre-wrap text-sm text-gray-600">
                    {debrief.content}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
