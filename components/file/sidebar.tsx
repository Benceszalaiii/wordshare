import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import BookData from "../../public/englishfile/file_structure.json";
import { ScrollArea } from "../ui/scroll-area";
export interface BookSection {
    section: string;
    audioFiles: string[];
}

export interface BookType {
    bookTitle: String;
    bookId: string;
    sections: BookSection[];
}

export const BookContent: BookType[] = JSON.parse(
    JSON.stringify(BookData.books),
);

export default function FilesSideBar({ className }: { className?: string }) {
    return (
        <ScrollArea className="h-72 w-full rounded-md border md:w-48">
            <div className="space-y-2 p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Books</h4>
                {BookContent.map((book) => (
                    <div key={book.bookId}>
                        <Link href={`/file/${book.bookId}`} key={book.bookId}>
                            {book.bookTitle}
                        </Link>
                        <Separator />
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}
