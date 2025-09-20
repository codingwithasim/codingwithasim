'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const SkipToContent = () => {
  const { t } = useLanguage();

  return (
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white p-2 rounded z-50">
      {t('skipToContent')}
    </a>
  );
};

export default SkipToContent;