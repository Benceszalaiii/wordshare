import AudioDialog from "@/components/file/dialog";
import { BookType, BookContent } from "@/components/file/sidebar";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { decodeSectionTitle } from "@/lib/utils";
export default function Page({ params }: { params: { bookLevel: string } }) {
    if (!BookContent.find((book) => book.bookId === params.bookLevel)) {
        return <h1>The book you are searching for does not exist.</h1>;
    }
    const currentBook = BookContent.find(
        (book) => book.bookId === params.bookLevel,
    ) as BookType;
    return (
        <>
            <h1 className="text-wrap text-lg font-semibold">
                {currentBook.bookTitle} English File Audio Sources
            </h1>
            <Accordion type="multiple" className="w-full max-w-screen-sm">
                {currentBook.sections.map((section) => {
                    const getName = ()=> {
                        if(section.section.startsWith("ce") || section.section.startsWith("pe") || section.section.startsWith("rc")) {
                            return decodeSectionTitle(section.section)
                        }
                        return `File ${section.section}`
                    }
                    return (
                    <AccordionItem key={section.section} value={section.section}>
                        <AccordionTrigger>{getName()}</AccordionTrigger>
                        <AccordionContent className="flex flex-row gap-3 flex-wrap">
                            {section.audioFiles.map((audioFile) => (
                                <AudioDialog currentBook={currentBook} section={section.section} audioFile={audioFile} key={audioFile} />
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                );
                })}
            </Accordion>
        </>
    );
}
