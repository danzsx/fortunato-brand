import { Home } from "@/components/home"; import { isLocale, type Locale } from "@/lib/i18n"; import { notFound } from "next/navigation";
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <Home locale={locale as Locale}/>}
