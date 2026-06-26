import type { Metadata } from "next";
import { Cinzel, Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

// Cinzel : seuls 600/700/900 sont utilisés (le 400 n'apparaît nulle part).
// C'est la police du titre hero (LCP) → on la précharge.
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  display: "swap",
  variable: "--font-display",
});

// Geist (corps de texte) : absent du hero (above the fold = Cinzel + mono).
// preload désactivé pour le sortir de la chaîne critique du LCP.
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-body",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Luca Vallet · Développeur .NET / Angular",
  description:
    "Portfolio interactif de Luca Vallet, développeur full-stack .NET et Angular basé à Strasbourg.",
  keywords: [
    "Luca Vallet",
    "développeur",
    ".NET",
    "Angular",
    "Strasbourg",
    "full-stack",
    "portfolio",
  ],
  icons: {
    icon: "/assets/plume_LV_favicon.svg?v=2",
  },
  openGraph: {
    title: "Luca Vallet · Développeur .NET / Angular",
    description:
      "Portfolio interactif de Luca Vallet, développeur full-stack .NET et Angular basé à Strasbourg.",
    type: "website",
    locale: "fr_FR",
    siteName: "Luca.exe",
  },
  twitter: {
    card: "summary",
    title: "Luca Vallet · Développeur .NET / Angular",
    description:
      "Portfolio interactif de Luca Vallet, développeur full-stack .NET et Angular basé à Strasbourg.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${cinzel.variable} ${geist.variable} ${geistMono.variable} font-body antialiased`}
      >
        <ThemeProvider attribute="data-theme" defaultTheme="parchemin" enableSystem={false}>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
