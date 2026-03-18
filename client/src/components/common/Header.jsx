import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const { language, changeLanguage, availableLanguages, t } = useLanguage();
  const { companyName, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">
          {t('app.name')}
        </h1>
        
        <div className="flex items-center gap-4">
          {companyName && (
            <span className="text-sm text-gray-500 hidden sm:inline">
              {companyName}
            </span>
          )}
          
          <div className="relative">
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {t(`languages.${lang}`)}
                </option>
              ))}
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              ▼
            </span>
          </div>

          <button
            onClick={logout}
            className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            title="Switch company"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
