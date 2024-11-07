export function VerticalSeparator({ className }: { className?: string }) {
    return (
        <div
            className={`h-6 w-0.5 bg-gray-700 dark:bg-gray-200 ${className}`}
        ></div>
    );
}
