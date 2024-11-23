import { Class } from "@prisma/client";
import ClassCard from "../class/card";
import CursorWrapper from "./cursor-wrapper";

export default function RecentClassSection({
    classes,
    userName,
    role,
}: {
    classes: Class[];
    userName: string;
    role: string;
}) {
    return (
        <CursorWrapper
            title="Recent classes"
            cursorColor=""
            className="flex flex-col w-full max-w-screen-md gap-2 p-4 mt-8 border rounded-lg border-border"
        >
            <div className="grid grid-cols-1 gap-4 place-content-center md:grid-cols-3">
                {classes.length > 0 ? (
                    classes
                        .slice(Math.max(0, classes.length - 3), classes.length)
                        .map((cls) => {
                            return (
                                <ClassCard currentClass={cls} key={cls.id} />
                            );
                        })
                ) : (
                    <p className="text-neutral-500">
                        {userName.split(" ")[0]} has yet to{" "}
                        {role === "teacher" || role === "admin"
                            ? "create"
                            : "join"}{" "}
                        classes
                    </p>
                )}
            </div>
        </CursorWrapper>
    );
}
