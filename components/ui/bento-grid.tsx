import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[8rem] grid-flow-row-dense grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  descriptionClassName = ""
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  descriptionClassName?: string;
}) => {
  return (
    <div
      className={cn(
        className,
        "row-span-1 rounded-xl group/bento hover:shadow-xl hover:scale-105 transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black/75 backdrop-blur-md dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 my-2">
          {title}
        </div>
        <div className={cn("font-sans h-full font-normal text-neutral-600 text-xs dark:text-neutral-300", descriptionClassName)}>
          {description}
        </div>
      </div>
    </div>
  );
};
