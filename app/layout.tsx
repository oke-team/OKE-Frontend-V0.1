import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OKÉ - Business Management",
  description: "Super app de gestion d'entreprise tout-en-un",
  manifest: "/manifest.json",
  metadataBase: new URL('https://oke.app'),
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OKÉ"
  },
  formatDetection: {
    telephone: false
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/icons/apple-icon-180x180.png" }
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/icons/safari-pinned-tab.svg",
        color: "#5e72ff"
      }
    ]
  },
  openGraph: {
    type: "website",
    siteName: "OKÉ",
    title: "OKÉ - Business Management",
    description: "Super app de gestion d'entreprise tout-en-un",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "OKÉ - Business Management",
    description: "Super app de gestion d'entreprise tout-en-un",
    images: ["/og-image.png"]
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#5e72ff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5e72ff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="OKÉ" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180x180.png" />
        <meta name="msapplication-TileColor" content="#5e72ff" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful');
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
