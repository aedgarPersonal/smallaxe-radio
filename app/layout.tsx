import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Small Axe Radio — Caribbean Sounds from the North",
  description:
    "Small Axe Radio streams reggae, dancehall, soca and roots for the Caribbean diaspora in Canada and beyond. Live 24/7.",
  openGraph: {
    title: "Small Axe Radio",
    description:
      "Caribbean sounds from the North — reggae, dancehall, soca, roots. Live 24/7.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#009B3A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebas.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        {children}
      </body>
    </html>
  );
}
