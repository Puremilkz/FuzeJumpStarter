import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export function FairCounter() {
  const { format } = useLanguage();
  const { sheetUrl } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      if (!sheetUrl) return;
      try {
        const result = await api.getWeeklyCount(sheetUrl);
        setCount(result.count || 0);
      } catch (err) {
        console.error('Failed to fetch weekly count');
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 60000);
    return () => clearInterval(interval);
  }, [sheetUrl]);

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
      <p className="text-sm text-gray-600">
        {format('jumpstart.weeklyUsage', { count })}
      </p>
      <p className="text-xs text-gray-400 mt-1">
        {format('jumpstart.dataNote', { region: 'Hong Kong' })}
      </p>
    </div>
  );
}
