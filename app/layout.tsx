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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://smallaxe-radio.vercel.app",
  ),
  title: "Riddim WSM — World Sound Music | Caribbean Radio",
  description:
    "Riddim WSM (World Sound Music) streams reggae, dancehall, soca and roots for the Caribbean diaspora in Canada and beyond. Live 24/7.",
  applicationName: "Riddim WSM",
  appleWebApp: {
    capable: true,
    title: "Riddim WSM",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Riddim WSM — World Sound Music",
    description:
      "Caribbean sounds from the North — reggae, dancehall, soca, roots. Live 24/7.",
    type: "website",
    images: [{ url: "/icon-512.png", width: 512, height: 512 }],
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
