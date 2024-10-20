import { toast } from "sonner";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function LeaveClassButton({ classId }: { classId: string }) {
  const router = useRouter();
  return (
    <Button
      variant={"destructive"}
      onClick={async () => {
        const res = await fetch(`/api/class/leave/${classId}`, {
          method: "POST",
        });
        if (res.ok) toast.success("Successfully left class");
        else toast.error("Failed to leave class");
        router.refresh();
      }}
    >
      Leave class
    </Button>
  );
}
