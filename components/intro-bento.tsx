import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/ui/bento-grid";
import { IconSchool, IconSignature, IconVocabulary } from "@tabler/icons-react";
import { SparkleIcon } from "lucide-react";
import React from "react";

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
        <BentoGrid className="mx-auto max-w-4xl">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    className={cn("motion-safe:motion-preset-expand", item.className)}
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
        icon: <IconSignature className="size-6 text-neutral-500" />,
        className: "",
    },
    {
        title: "Expand Your Vocabulary",
        description:
            "Learn new words and phrases to express yourself more effectively.",
        icon: <IconVocabulary className="size-6 text-neutral-500" />,
        className: "",
    },

    {
        title: "Join Classes",
        className: " md:row-span-2",
        description:
            "Join classes to learn with others and get feedback from teachers.",
        icon: <IconSchool className="size-6 text-neutral-500" />,
    },
    {
        title: "Earn rewards for daily learning",
        description:
            "Get WordPoints for completing tasks and participate in challenges.",
        icon: <SparkleIcon className="size-6 text-neutral-500" />,
        className: " md:col-span-2",
    },
];
