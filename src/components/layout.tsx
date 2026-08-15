import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";
import { copy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const t = copy(locale); const other = locale === "pt" ? "en" : "pt";
  const links = [["/projects", t.nav[0]], ["/services", t.nav[1]], ["/about", t.nav[2]]] as const;
  return <header className="container header"><Link className="brand" href={`/${locale}`}>FORTUNATO BRANDS</Link><nav className="desktop-nav" aria-label="Primary navigation">{links.map(([href,label]) => <Link key={href} href={`/${locale}${href}`}>{label}</Link>)}<Link className="locale" href={`/${other}`} hrefLang={other}>{other.toUpperCase()}</Link><Link className="button" href={`/${locale}/start`}>{t.start}</Link></nav><MobileMenu locale={locale} links={links} start={t.start}/></header>;
}
export function Footer({ locale }: { locale: Locale }) { const t = copy(locale); return <footer className="container footer"><div className="footer-inner"><div><strong className="brand">FORTUNATO BRANDS</strong><p>{t.footer}</p></div><div><Link href={`/${locale}/privacy`}>{locale === "pt" ? "Privacidade" : "Privacy"}</Link></div></div></footer>; }
