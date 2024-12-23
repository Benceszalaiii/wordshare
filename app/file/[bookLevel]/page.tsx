import AudioDialog from "@/components/file/dialog";
import { BookContent, BookType } from "@/components/file/sidebar";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { decodeSectionTitle } from "@/lib/utils";

type Params = Promise<{ bookLevel: string }>;

export default async function Page({ params }: { params: Params }) {
    const { bookLevel } = await params;
    if (!BookContent.find((book) => book.bookId === bookLevel)) {
        return <h1>The book you are searching for does not exist.</h1>;
    }
    const currentBook = BookContent.find(
        (book) => book.bookId === bookLevel,
    ) as BookType;
    return (
        <>
            <h1 className="text-wrap text-lg font-semibold">
                {currentBook.bookTitle} English File Audio Sources
            </h1>
            <Accordion type="multiple" className="w-full max-w-screen-sm">
                {currentBook.sections.map((section) => {
                    const getName = () => {
                        if (
                            section.section.startsWith("ce") ||
                            section.section.startsWith("pe") ||
                            section.section.startsWith("rc")
                        ) {
                            return decodeSectionTitle(section.section);
                        }
                        return `File ${section.section}`;
                    };
                    return (
                        <AccordionItem
                            key={section.section}
                            value={section.section}
                        >
                            <AccordionTrigger>{getName()}</AccordionTrigger>
                            <AccordionContent className="flex flex-row flex-wrap gap-3">
                                {section.audioFiles.map((audioFile) => (
                                    <AudioDialog
                                        currentBook={currentBook}
                                        section={section.section}
                                        audioFile={audioFile}
                                        key={audioFile}
                                    />
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </>
    );
}
