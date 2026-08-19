export type DownloadItem = {
  slug: string;
  title: string;
  clientName: string;
  projectName: string;
  description: {
    pt: string;
    en: string;
  };
  fileName: string;
  fileUrl: string;
  fileSize?: string;
  category: {
    pt: string;
    en: string;
  };
  updatedAt: string;
};

export const downloads: Record<string, DownloadItem> = {
  "som-e-alma": {
    slug: "som-e-alma",
    title: "Apresentação Som & Alma",
    clientName: "Som & Alma",
    projectName: "Som & Alma — Branding & Identidade",
    description: {
      pt: "A apresentação oficial da sua marca está pronta. Você pode visualizar o documento online ou fazer o download do arquivo em alta resolução.",
      en: "Your official brand presentation is ready. You can view the document online or download the file in high resolution."
    },
    fileName: "Apresentacao_som_e_alma.pdf",
    fileUrl: "/downloads/Apresentacao_som_e_alma.pdf",
    category: {
      pt: "Apresentação de Marca",
      en: "Brand Presentation"
    },
    updatedAt: "19/08/2026"
  }
};

export function getDownload(slug: string): DownloadItem | undefined {
  return downloads[slug];
}
