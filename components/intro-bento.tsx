import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/ui/bento-grid";
import {
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import { SignatureIcon } from "lucide-react";
import React from "react";
import { AnimatedGradientText } from "./ui/gradient-text";

type BentoItem = {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    descriptionClassName?: string;
};

export default function IntroBento() {
    return (
        <BentoGrid className="mx-auto max-w-4xl ">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    className={cn("",item.className)}
                    descriptionClassName={item.descriptionClassName}
                />
            ))}
        </BentoGrid>
    );
}
const Skeleton = () => (
    <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"></div>
);

const items: BentoItem[] = [
    {
        title: "Improve Your Writing",
        description:
            "Enhance your writing skills with engaging tasks or randomly given topics.",
        icon: <SignatureIcon className="h-4 w-4 text-neutral-500" />,
        className: "dark:!border-red-500/50 ",
    },
    {
        title: "Expand Your Vocabulary",
        description:
            "Learn new words and phrases to express yourself more effectively.",
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
        className: "dark:!border-main-600/50",
    },

    {
        title: "Join Classes",
        className: "dark:!border-sky-500/50 md:row-span-2",
        description: "Join classes to learn with others and get feedback from teachers.",
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Earn rewards for daily learning",
        description:
            "Get WordPoints for completing tasks and participate in challenges.",
            icon: <IconTableColumn className="h-4 w-4 text-neutral-500 " />,
            className: "dark:!border-yellow-500/50 md:col-span-2",
    }
];
