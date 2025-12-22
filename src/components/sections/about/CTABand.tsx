import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { LuDownload } from "react-icons/lu";


export default function CTABand() {

    const { t } = useLanguage();

    return (
        <section className="text-center border-t border-b border-dark-800 py-12">
          <div className=" max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold text-white mb-4">
              {t("about.cta.title")}
            </h4>
            <p className="text-white/70 mb-6">
              {t("about.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/contact">
                  {t("contact.info.title")}
                </a>
              </Button>
              <Button asChild variant="secondary">
                <Link target="_blank" href="https://drive.google.com/file/d/1Jpl50FyYVxd1rvi22_GnIs16fIgYYctq/view?usp=drive_link">
                  <LuDownload/>
                  {t("about.cta.download")}
                </Link>
              </Button>
            </div>
          </div>
        </section>
    )
}