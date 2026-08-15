import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/layout";
import { isLocale, locales, type Locale } from "@/lib/i18n";
export function generateStaticParams(){return locales.map(locale=>({locale}));}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <><a className="skip" href="#main">{locale === "pt" ? "Pular para o conteúdo" : "Skip to content"}</a><Header locale={locale as Locale}/><main id="main">{children}</main><Footer locale={locale as Locale}/></>}
