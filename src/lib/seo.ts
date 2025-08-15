import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: {
    default: "Boardly - Enterprise Project Management Platform",
    template: "%s | Boardly",
  },
  description:
    "The comprehensive project management solution designed for modern teams and organizations. Plan, track, and deliver work efficiently with workspaces, projects, tasks, kanban boards, and analytics.",
  keywords: [
    "project management",
    "team collaboration",
    "kanban board",
    "task management",
    "workspace",
    "agile",
    "scrum",
    "productivity",
    "team lead",
    "project tracking",
    "workflow management",
    "team analytics",
  ],
  authors: [{ name: "Ali Samir" }],
  creator: "Ali Samir",
  publisher: "Ali Samir",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4200"
  ),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Boardly - Enterprise Project Management Platform",
    description:
      "The comprehensive project management solution designed for modern teams and organizations. Plan, track, and deliver work efficiently.",
    siteName: "Boardly",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Boardly - Enterprise Project Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boardly - Enterprise Project Management Platform",
    description:
      "The comprehensive project management solution designed for modern teams and organizations.",
    images: ["/og-image.webp"],
    creator: "@alisamirali",
  },
  category: "productivity",
  classification: "Project Management Software",
  other: {
    "application-name": "Boardly",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Boardly",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#000000",
    "msapplication-tap-highlight": "no",
    "theme-color": "#000000",
  },
};

export const authMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export const workspaceMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export const projectMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export const taskMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export function generateMetadata(
  title: string,
  description: string,
  options: {
    noIndex?: boolean;
    openGraph?: Partial<Metadata["openGraph"]>;
    twitter?: Partial<Metadata["twitter"]>;
  } = {}
): Metadata {
  const { noIndex = false, openGraph, twitter } = options;

  return {
    title,
    description,
    robots: noIndex ? { index: false, follow: false } : defaultMetadata.robots,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      ...openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
      ...twitter,
    },
  };
}

export const seoConfig = {
  default: defaultMetadata,
  auth: authMetadata,
  workspace: workspaceMetadata,
  project: projectMetadata,
  task: taskMetadata,
  generate: generateMetadata,
};
