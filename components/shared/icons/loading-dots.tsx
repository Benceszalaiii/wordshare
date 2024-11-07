import { cn } from "@/lib/utils";
import styles from "./loading-dots.module.css";

const LoadingDots = ({
    color = "#000",
    className,
}: {
    color?: string;
    className?: string;
}) => {
    return (
        <span className={cn(styles.loading, className)}>
            <span style={{ backgroundColor: color }} />
            <span style={{ backgroundColor: color }} />
            <span style={{ backgroundColor: color }} />
        </span>
    );
};

export default LoadingDots;
