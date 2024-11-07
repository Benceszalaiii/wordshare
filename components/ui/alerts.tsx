export function Warning({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <>
            <div className=" flex flex-row items-center gap-5 rounded-xl border-2 border-red-700/50 bg-red-500/50 p-4 text-dark dark:bg-red-500/25 dark:text-light">
                <aside className="text-xl">⚠️</aside>
                <h1>{children}</h1>
            </div>
        </>
    );
}
