import { cn } from "@/lib/utils";
import styles from "./loading-spinner.module.css";

export default function LoadingSpinner({className}: {className?: string}) {
  return (
    <div className={cn(styles.spinner, className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
