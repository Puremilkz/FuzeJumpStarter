import { useLanguage } from '../../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto bg-white border-t border-gray-200 px-4 py-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs text-gray-500 text-center mb-2">
          {t('footer.safetyNote')}
        </p>
        <p className="text-xs text-gray-400 text-center">
          {t('footer.support')}
        </p>
      </div>
    </footer>
  );
}
