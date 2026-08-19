import { notFound } from "next/navigation";
import { DownloadPresentationClient } from "@/components/download-presentation-client";
import { downloads, getDownload } from "@/content/downloads";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of Object.keys(downloads)) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export default async function DownloadPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const item = getDownload(slug);
  if (!item) notFound();

  return <DownloadPresentationClient item={item} locale={locale as Locale} />;
}
