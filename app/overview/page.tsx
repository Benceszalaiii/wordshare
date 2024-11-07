import { getServerSession } from "next-auth";
import WipPage from "../../components/wip";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function Page() {
    const session = await getServerSession(authOptions);
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
