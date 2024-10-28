import "server-only"
import { getAllClasses } from "@/lib/db";
import { Class } from "@prisma/client";

export default async function sitemap() {
    const baseUrl = "https://www.wordshare.tech";
    const fetchedClasses = (await getAllClasses()).map((c: Class)=> ({url: `${baseUrl}/class/${c.id}`, lastModified: c.createdAt, priority: 0.7}));
    return [
        {
            url: baseUrl + "/",
            lastModified: new Date(),
            priority: 1.0,
        },
        {
            url: baseUrl + "/essay",
            lastModified: new Date(),
            priority: 0.9,
        },
        {
            url: baseUrl + "/wordplay",
            lastModified: new Date(),
            priority: 0.9,
        },
        {
            url: baseUrl + "/invites",
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: baseUrl + "/file",
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: baseUrl + "/roadmap",
            lastModified: new Date(),
            priority: 0.8,
        },
        ...fetchedClasses
    ];
}
