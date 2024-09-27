import "./globals.css";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: "Jedlik WordShare",
  description:
    "Learn English with daily cards! 📚🔥",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth " suppressHydrationWarning>

      <body className={cx(sfPro.variable, inter.variable)}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <div className="fixed h-screen w-full bg-cover bg-main-light dark:bg-main-dark dark:to-black dark:text-light text-dark" />
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center py-32 z-10">
          {children}
        </main>
        <Footer />
        <VercelAnalytics />
      </ThemeProvider>
      </body>
    </html>
  );
}
