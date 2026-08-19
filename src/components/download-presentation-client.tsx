"use client";

import { useState } from "react";
import type { DownloadItem } from "@/content/downloads";
import type { Locale } from "@/lib/i18n";

export function DownloadPresentationClient({
  item,
  locale
}: {
  item: DownloadItem;
  locale: Locale;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const isPt = locale === "pt";

  return (
    <div className="download-shell">
      <header className="step-header" style={{ textAlign: "center", marginBottom: 12 }}>
        <div className="download-badge-status">
          <span className="download-pulse-dot"></span>
          <span>{isPt ? "Arquivo Pronto para Download" : "File Ready for Download"}</span>
        </div>
        <h1>{item.title}</h1>
        <p className="step-subtitle" style={{ maxWidth: 620, margin: "0 auto" }}>
          {isPt ? item.description.pt : item.description.en}
        </p>
      </header>

      <div className="download-card">
        <div className="download-file-banner">
          <div className="download-pdf-icon">PDF</div>
          <div className="download-file-info">
            <h3>{item.fileName}</h3>
            <p>
              {isPt
                ? "Documento de Apresentação Executiva"
                : "Executive Presentation Document"}
            </p>
          </div>
        </div>

        <div className="download-meta-grid">
          <div className="download-meta-item">
            <label>{isPt ? "Projeto" : "Project"}</label>
            <span>{item.clientName}</span>
          </div>
          <div className="download-meta-item">
            <label>{isPt ? "Categoria" : "Category"}</label>
            <span>{isPt ? item.category.pt : item.category.en}</span>
          </div>
          <div className="download-meta-item">
            <label>{isPt ? "Formato" : "Format"}</label>
            <span>PDF (Alta Resolução)</span>
          </div>
          <div className="download-meta-item">
            <label>{isPt ? "Data" : "Date"}</label>
            <span>{item.updatedAt}</span>
          </div>
        </div>

        <div className="download-actions">
          <a
            href={item.fileUrl}
            download={item.fileName}
            className="btn-primary-download"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>
              {isPt ? "Baixar Apresentação (PDF)" : "Download Presentation (PDF)"}
            </span>
          </a>

          <div className="download-secondary-row">
            <a
              href={item.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-action"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>{isPt ? "Abrir no Navegador" : "Open in Browser"}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              className="btn-secondary-action"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {copied ? (
                  <polyline points="20 6 9 17 4 12" />
                ) : (
                  <>
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </>
                )}
              </svg>
              <span>
                {copied
                  ? isPt
                    ? "Link Copiado!"
                    : "Link Copied!"
                  : isPt
                  ? "Copiar Link da Página"
                  : "Copy Page Link"}
              </span>
            </button>
          </div>
        </div>

        <div className="download-support-note">
          <p>
            {isPt
              ? "Alguma dúvida ou ajuste necessário na apresentação?"
              : "Any questions or adjustments needed?"}{" "}
            <a href={`/${locale}/start`}>
              {isPt ? "Entre em contato conosco" : "Get in touch with us"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
