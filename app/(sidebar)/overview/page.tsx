import { auth } from "@/lib/auth";
import { default as WipPage } from "@/components/wip";
export default async function Page() {
    const session = await auth();
    return (
        <>
            <WipPage>
                <span className="text-4xl font-bold text-main-600">
                    Overview
                </span>
            </WipPage>
        </>
    );
}
