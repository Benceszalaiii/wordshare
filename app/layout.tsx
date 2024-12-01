import { CommandProvider } from "@/components/layout/commandprovider";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/toaster";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import cx from "classnames";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { caveat, inter, sfPro } from "./fonts";
import "./globals.css";
import { Suspense } from "react";
import Nav from "@/components/layout/nav";
export const metadata: Metadata = {
    metadataBase: new URL("http://localhost:3000"),
    title: {
        default: "WordShare",
        template: "%s | WordShare",
    },
    description: "Learn English with daily cards! 📚🔥",
    category: "Education",
    keywords: [
        "english",
        "learn",
        "cards",
        "vocabulary",
        "education",
        "study",
        "jedlik",
        "essay",
        "wordshare",
        "language",
    ],
    openGraph: {
        type: "website",
        locale: "hu_HU",
        title: "WordShare",
        description: "Learn English with daily cards! 📚🔥",
        url: "http://www.wordshare.tech",
        siteName: "WordShare",
        alternateLocale: ["en_US", "de_DE", "en_GB"],
        images: [
            {
                url: "https://www.wordshare.tech/og_image.png",
                width: 1200,
                height: 630,
                alt: "WordShare",
            },
        ],
    },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <meta name="msapplication-TileColor" content="#00aba9" />
                <meta name="theme-color" content="#c1c1c1" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </head>
            <body
                id="page"
                className={cx(sfPro.variable, inter.variable, caveat.variable)}
            >
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <CommandProvider />
                    <main className="z-10 flex min-h-screen w-full flex-col">
                        <Nav />
                        {children}
                        {/* <Suspense
                            fallback={
                                <div className="fixed left-0 top-0 -z-10 m-0 h-full w-full bg-light object-contain p-0 dark:bg-dark" />
                            }
                        >
                            <div className="fixed left-0 top-0 -z-10 m-0 h-full w-full bg-main-light bg-cover bg-center bg-no-repeat p-0 dark:bg-main-dark" />
                        </Suspense>
                        <h1 className="mb-16 mt-8 w-full text-center font-caveat text-3xl text-main-600">
                            WordShare
                        </h1>
                        <h1 className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                            We are undergoing maintenance right now. <br />{" "}
                            Please be patient as we are striving to find a
                            solution.
                        </h1> */}
                    </main>
                    <Footer />
                    <Toaster visibleToasts={2} />
                    <VercelAnalytics debug={false} mode="auto" />
                    <SpeedInsights debug={false} />
                </ThemeProvider>
            </body>
        </html>
    );
}
