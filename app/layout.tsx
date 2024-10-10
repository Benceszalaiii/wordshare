import "./globals.css";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next"
export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "WordShare",
  description: "Learn English with daily cards! 📚🔥"
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth " suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#c1c1c1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={cx(sfPro.variable, inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <main className="z-10 flex min-h-screen w-full flex-col pt-24">
          <Suspense fallback="...">
            <Nav />
          </Suspense>
            {children}
          <Footer />
          </main>
          <Toaster richColors={true} theme="dark" visibleToasts={3} expand />
          <VercelAnalytics debug={false} mode="auto"  />
          <SpeedInsights debug={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}
