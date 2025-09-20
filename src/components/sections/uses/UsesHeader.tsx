'use client';

import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

export default function UsesHeader () {
    const { t } = useLanguage();
    return (
    <section className="pt-40 pb-32 relative pattern">

        <div className="container-custom max-w-4xl relative">

          <div className="text-center space-y-6 z-1 relative">
            <h3 className="text-4xl md:text-5xl font-light text-white">
              {t('usesPage.title')}
            </h3>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              {t('usesPage.description')}
            </p>

            <div className="mx-auto w-fit mt-6 flex flex-wrap justify-center gap-2">
              {
                [t('usesPage.badges.frontend'), t('usesPage.badges.design'), t('usesPage.badges.experience')].map(
                  (v, idx) => {
                    return (
                      <Badge variant="secondary" key={idx}>{v}</Badge>
                    )
                  }
                )
              }
             </div>
          </div>
        </div>

      </section>
    )
}