import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: { default: "Fortunato Brands", template: "%s — Fortunato Brands" }, description: "Branding e design digital com clareza e intenção." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html>; }
