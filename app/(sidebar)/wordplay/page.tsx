import WipPage from "@/components/wip";
import { caveat } from "@/app/fonts";
export default function Page() {
    return (
        <>
            <WipPage>
                <span
                    className={
                        "text-4xl font-bold text-main-600 " + caveat.className
                    }
                >
                    WordPlay
                </span>
            </WipPage>
        </>
    );
}
