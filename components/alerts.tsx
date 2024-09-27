export function Warning({className, children}: {className?: string, children: React.ReactNode}) {
    return(
        <>
        <div className=" rounded-xl bg-red-500/50 border-2 dark:bg-red-500/25 border-red-700/50 text-dark p-4 gap-5 dark:text-light flex flex-row items-center">
        <aside className="text-xl">⚠️</aside>
        <h1>{children}</h1>
        </div>
        </>
    )

}