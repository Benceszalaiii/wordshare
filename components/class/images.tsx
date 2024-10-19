import { cn } from "@/lib/utils";
import Image from "next/image";

export function Icon({ classId, className }: { classId: string, className?: string }) {
  return (
    <div className={cn("rounded-full w-48 h-48 relative", className)}>
      <Image src={`/class/icons/${classId}`} alt="" className="rounded-full w-full h-full object-fill" fill draggable={false} />
    </div>
  );
}
