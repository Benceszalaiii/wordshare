import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            disallow: ["/api", "/essay/write", "/quickstart", "/admin"],
        },
        sitemap: "https://www.wordshare.tech/sitemap.xml",
    };
}
