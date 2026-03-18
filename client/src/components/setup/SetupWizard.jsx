import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import { LoadingSpinner } from '../common/LoadingSpinner';
import api from '../../services/api';

export function SetupWizard() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const { showToast } = useToast();
  
  const [companyCode, setCompanyCode] = useState('');
  const [sheetUrl, setSheetUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = async () => {
    setError('');
    setIsLoading(true);

    try {
      const authResult = await api.authValidate(companyCode);
      
      if (!authResult.valid) {
        setError(t('setup.validateCodeError'));
        setIsLoading(false);
        return;
      }

      if (sheetUrl.trim()) {
        try {
          const setupResult = await api.setupConnect(sheetUrl);
          if (!setupResult.success) {
            setError(t('setup.validateSheetError'));
            setIsLoading(false);
            return;
          }
        } catch (sheetErr) {
          console.log('Sheet validation skipped');
        }
      }

      login(companyCode, sheetUrl || null, authResult.companyName);
      showToast(t('setup.success'), 'success');
    } catch (err) {
      setError(t('setup.validateSheetError'));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {t('app.name')}
            </h1>
            <p className="text-gray-500">Sign in to start</p>
          </div>

          <div className="space-y-5">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Step 1: Company Code
              </h3>
              <p className="text-xs text-blue-600 mb-3">
                Provided by your admin. This identifies your organization.
              </p>
              <input
                type="text"
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
                placeholder="e.g., FUZE2026"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Step 2: Data Sheet (Optional)
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Create your own Google Sheet with two tabs: "Usage Log" and "Debriefs". Share with the service account email to store your data securely.
              </p>
              <input
                type="url"
                value={sheetUrl}
                onChange={(e) => setSheetUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-400 mt-2">
                Leave empty to use local storage only
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              onClick={handleConnect}
              disabled={!companyCode.trim() || isLoading}
              className="w-full py-2.5 bg-teal-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
            >
              {isLoading && <LoadingSpinner size="sm" />}
              {isLoading ? t('setup.connecting') : t('setup.connect')}
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            {t('setup.footer')}
          </p>
        </div>
      </div>
    </div>
  );
}
