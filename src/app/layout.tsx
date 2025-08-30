import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hypideas.com - Professional Research & Innovation Platform",
  description: "Connect with researchers, share ideas, collaborate on innovations. A professional platform for academic networking, research publication, and intellectual property development.",
  keywords: ["research", "innovation", "academia", "collaboration", "patents", "ideas", "networking"],
  authors: [{ name: "Hypideas Team" }],
  robots: "index, follow",
  openGraph: {
    title: "Hypideas.com - Research & Innovation Platform",
    description: "Professional platform for researchers, innovators, and academics to connect, collaborate, and commercialize ideas.",
    type: "website",
    siteName: "Hypideas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hypideas.com - Research & Innovation Platform",
    description: "Connect with researchers, share ideas, collaborate on innovations.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}