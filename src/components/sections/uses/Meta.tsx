import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Meta(){
    const { t } = useLanguage();

    return (
        <section className=" mx-auto max-w-6xl text-center w-full">
            <Card className="p-12 w-full flex flex-col gap-4 bg-card border-border">
                <CardTitle className="font-[450]">
                    <h4>{t('usesPage.meta.title')}</h4>
                </CardTitle>
                <CardContent>
                    <p className="max-w-4xl mx-auto text-muted-foreground">
                        {t('usesPage.meta.description')}
                    </p>
                </CardContent>
            </Card>
        </section>
    )
} 
