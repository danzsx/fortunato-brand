"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
export function MobileMenu({ locale, links, start }: { locale: Locale; links: readonly (readonly [string,string])[]; start: string }) {
 const [open,setOpen]=useState(false); const button=useRef<HTMLButtonElement>(null); const other=locale==="pt"?"en":"pt";
 useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);button.current?.focus();}};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close)},[]);
 return <><button ref={button} className="menu-button" aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}>{open?"Fechar":"Menu"}</button><nav id="mobile-menu" className="mobile-menu" data-open={open} aria-label="Mobile navigation">{links.map(([href,label])=><Link key={href} onClick={()=>setOpen(false)} href={`/${locale}${href}`}>{label}</Link>)}<Link onClick={()=>setOpen(false)} className="button" href={`/${locale}/start`}>{start}</Link><Link onClick={()=>setOpen(false)} href={`/${other}`}>{other.toUpperCase()}</Link></nav></>;
}
