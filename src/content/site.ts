import type { Locale } from "@/lib/i18n";

type Copy = {
  nav: string[];
  start: string;
  hero: { title: string; body: string; primary: string; secondary: string };
  projects: string;
  manifesto: { title: string; body: string };
  services: { label: string; title: string; items: { title: string; body: string }[] };
  process: { title: string; items: { title: string; body: string }[] };
  about: { title: string; body: string };
  final: { title: string; action: string };
  footer: string;
};

const pt: Copy = {
  nav: ["Projetos", "Serviços", "Sobre"],
  start: "Começar um projeto",
  hero: {
    title: "Marcas mais fortes começam com uma identidade bem construída.",
    body: "Estratégia, naming e identidade visual para negócios que querem ser percebidos com mais valor.",
    primary: "Começar um projeto",
    secondary: "Ver projetos"
  },
  projects: "Projetos selecionados",
  manifesto: {
    title: "Um logotipo não precisa apenas ser bonito. Precisa fazer sentido para a marca que representa.",
    body: "O processo começa com compreensão e clareza, para que a identidade represente o negócio com coerência."
  },
  services: {
    label: "Serviços",
    title: "Uma marca clara, do começo à presença digital.",
    items: [
      { title: "Identidade Visual", body: "Marcas criadas do zero ou evoluídas com estratégia, naming, logotipo e um sistema visual coerente." },
      { title: "Rebranding", body: "Para quando a marca já não acompanha o momento, o posicionamento ou a maturidade da empresa." },
      { title: "Websites", body: "A continuidade da identidade no ambiente digital, com presença institucional coerente." }
    ]
  },
  process: {
    title: "Como trabalhamos",
    items: [
      { title: "Entender", body: "Conhecer o negócio, seu momento e o que a marca precisa comunicar." },
      { title: "Direcionar", body: "Transformar entendimento em foco, critérios e direção." },
      { title: "Criar", body: "Construir uma identidade clara, própria e coerente." },
      { title: "Aplicar", body: "Preparar a marca para aparecer com consistência." }
    ]
  },
  about: {
    title: "Uma boutique independente para marcas que valorizam clareza.",
    body: "A Fortunato Brands conduz cada projeto de perto, com presença autoral, critério e uma relação direta."
  },
  final: {
    title: "Tem um projeto em mente?",
    action: "Começar um projeto"
  },
  footer: "Branding e design digital com clareza e intenção."
};

const en: Copy = {
  nav: ["Projects", "Services", "About"],
  start: "Start a project",
  hero: {
    title: "Stronger brands begin with a well-built identity.",
    body: "Strategy, naming and visual identity for businesses that want to be perceived with greater value.",
    primary: "Start a project",
    secondary: "View projects"
  },
  projects: "Selected projects",
  manifesto: {
    title: "A logo does not only need to look good. It needs to make sense for the brand it represents.",
    body: "O processo começa com compreensão e clareza, para que a identidade represente o negócio com coerência."
  },
  services: {
    label: "Services",
    title: "A clear brand, from its beginning to its digital presence.",
    items: [
      { title: "Visual Identity", body: "Brands created from scratch or evolved through strategy, naming, logo and a coherent visual system." },
      { title: "Rebranding", body: "For when a brand no longer reflects the company’s moment, position or maturity." },
      { title: "Websites", body: "The identity continuing in digital, with a coherent institutional presence." }
    ]
  },
  process: {
    title: "How we work",
    items: [
      { title: "Understand", body: "Getting to know the business, its moment and what the brand needs to communicate." },
      { title: "Direct", body: "Turning understanding into focus, criteria and direction." },
      { title: "Create", body: "Building a clear, distinctive and coherent identity." },
      { title: "Apply", body: "Preparing the brand to show up consistently." }
    ]
  },
  about: {
    title: "An independent boutique for brands that value clarity.",
    body: "Fortunato Brands leads every project closely, with authorial direction, care and a direct relationship."
  },
  final: {
    title: "Have a project in mind?",
    action: "Start a project"
  },
  footer: "Branding and digital design with clarity and intention."
};

export const copy = (locale: Locale) => (locale === "pt" ? pt : en);

export type ProjectMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
  fit?: "cover" | "contain";
};

export type ProjectSection = {
  id: string;
  type: "media-text" | "full-media" | "brand-system";
  title?: string;
  body?: string;
  media: ProjectMedia;
};

export type Project = {
  slug: string;
  name: string;
  segment: string;
  services: string[];
  intro: string;
  order: number;
  next: string;
  tone: string;
  facts: string[];
  heroImage: ProjectMedia;
  cardImage: ProjectMedia;
  sections?: ProjectSection[];
};

const projects: Project[] = [
  {
    slug: "sublime-mel",
    name: "Sublime Mel",
    segment: "Alimentos",
    services: ["Naming", "Estratégia inicial", "Identidade Visual"],
    intro: "Uma marca criada desde o início.",
    order: 1,
    next: "enveiro",
    tone: "honey",
    facts: ["Nova empresa", "Naming e identidade criados do zero"],
    heroImage: {
      src: "/projects/sublime-mel/hero.webp",
      width: 2400,
      height: 1698,
      alt: "Identidade visual da Sublime Mel com símbolo da abelha sobre composição fotográfica em tons quentes florais de mel.",
      fit: "cover"
    },
    cardImage: {
      src: "/projects/sublime-mel/hero.webp",
      width: 2400,
      height: 1698,
      alt: "Identidade visual da Sublime Mel com logotipo centralizado e tom dourado.",
      fit: "cover"
    },
    sections: [
      {
        id: "brand-application-01",
        type: "media-text",
        title: "Aplicação e presença da marca",
        body: "Peça de identidade visual e comunicação desenvolvida com a paleta em tons de mel e verde profundo, reforçando a assinatura da marca.",
        media: {
          src: "/projects/sublime-mel/brand-application-01.webp",
          width: 1080,
          height: 1080,
          alt: "Composição gráfica da Sublime Mel com fotografia e a mensagem 'Experimente o sublime.' nas cores institucionais.",
          fit: "cover"
        }
      }
    ]
  },
  {
    slug: "enveiro",
    name: "enveiro_",
    segment: "Loja de variedades",
    services: ["Naming", "Logotipo", "Identidade Visual", "Aplicações"],
    intro: "Naming e identidade visual para uma loja de variedades.",
    order: 2,
    next: "palomo-odontologia",
    tone: "forest",
    facts: ["Naming criado para o projeto", "Identidade visual e aplicações"],
    heroImage: {
      src: "/projects/enveiro/hero.webp",
      width: 1191,
      height: 1684,
      alt: "Pôster de identidade da marca enveiro_ embalagens e festas com logotipo em amarelo sobre fundo azul com confetes.",
      fit: "cover"
    },
    cardImage: {
      src: "/projects/enveiro/hero.webp",
      width: 1191,
      height: 1684,
      alt: "Pôster institucional da enveiro_ com wordmark em destaque.",
      fit: "cover"
    }
  },
  {
    slug: "palomo-odontologia",
    name: "Palomo Odontologia",
    segment: "Odontologia / Saúde",
    services: ["Logotipo", "Identidade Visual"],
    intro: "Uma identidade visual para odontologia, preservando o logotipo original.",
    order: 3,
    next: "sublime-mel",
    tone: "rose",
    facts: ["Logotipo original preservado", "Identidade visual"],
    heroImage: {
      src: "/projects/palomo-odontologia/hero.webp",
      width: 842,
      height: 595,
      alt: "Logotipo da Palomo Odontologia Especializada com símbolo de dente e implante em linhas douradas e prateadas.",
      fit: "contain"
    },
    cardImage: {
      src: "/projects/palomo-odontologia/hero.webp",
      width: 842,
      height: 595,
      alt: "Logotipo oficial preservado da Palomo Odontologia.",
      fit: "contain"
    }
  }
];

const enProjects: Record<string, Pick<Project, "segment" | "services" | "intro" | "facts"> & {
  heroImageAlt: string;
  cardImageAlt: string;
  sections?: { title?: string; body?: string; mediaAlt: string }[];
}> = {
  "sublime-mel": {
    segment: "Food",
    services: ["Naming", "Initial strategy", "Visual Identity"],
    intro: "A brand created from the beginning.",
    facts: ["New company", "Naming and identity created from scratch"],
    heroImageAlt: "Sublime Mel visual identity with bee symbol over warm golden floral background.",
    cardImageAlt: "Sublime Mel visual identity with centered logo and golden palette.",
    sections: [
      {
        title: "Application and brand presence",
        body: "Visual identity and communication piece developed in honey tones and deep forest green, reinforcing the brand mark.",
        mediaAlt: "Sublime Mel graphic composition featuring photography and the tagline 'Experimente o sublime.' in brand colors."
      }
    ]
  },
  enveiro: {
    segment: "Variety store",
    services: ["Naming", "Logo", "Visual Identity", "Applications"],
    intro: "Naming and visual identity for a variety store.",
    facts: ["Naming created for the project", "Visual identity and applications"],
    heroImageAlt: "enveiro_ packaging and party brand poster with yellow logo over blue confetti background.",
    cardImageAlt: "enveiro_ institutional poster with prominent brand wordmark."
  },
  "palomo-odontologia": {
    segment: "Dentistry / Healthcare",
    services: ["Logo", "Visual Identity"],
    intro: "A visual identity for dentistry, preserving the original logo.",
    facts: ["Original logo preserved", "Visual identity"],
    heroImageAlt: "Palomo Odontologia Especializada logo with tooth and implant symbol in gold and silver.",
    cardImageAlt: "Palomo Odontologia official preserved logo."
  }
};

export const getProjects = (locale: Locale = "pt"): Project[] => {
  if (locale !== "en") return projects;
  return projects.map((project) => {
    const enData = enProjects[project.slug];
    if (!enData) return project;
    return {
      ...project,
      segment: enData.segment,
      services: enData.services,
      intro: enData.intro,
      facts: enData.facts,
      heroImage: {
        ...project.heroImage,
        alt: enData.heroImageAlt
      },
      cardImage: {
        ...project.cardImage,
        alt: enData.cardImageAlt
      },
      sections: project.sections?.map((section, idx) => {
        const enSec = enData.sections?.[idx];
        if (!enSec) return section;
        return {
          ...section,
          title: enSec.title ?? section.title,
          body: enSec.body ?? section.body,
          media: {
            ...section.media,
            alt: enSec.mediaAlt
          }
        };
      })
    };
  });
};

export const getProject = (slug: string, locale: Locale = "pt") =>
  getProjects(locale).find((project) => project.slug === slug);
