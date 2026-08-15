import { BriefingFlow } from "@/components/briefing-flow"; import { isLocale,type Locale } from "@/lib/i18n"; import { notFound } from "next/navigation";
export default async function Start({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <BriefingFlow locale={locale as Locale}/>}
