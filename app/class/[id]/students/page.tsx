import { SignInButton } from "@/components/shared/buttons";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import {
    checkForPoints,
    getClassById,
    getClassStudentsByClassId,
    getUserById,
    isOwnClass,
} from "@/lib/db";
import { Points, User } from "@prisma/client";
import { Metadata } from "next";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "./data-table";
export interface UserWithClassId extends User {
    classId: string;
    points: number;
}
async function getData(
    classId: string,
    classStudents: User[],
    classPoints: Points[],
) {
    const students: UserWithClassId[] = classStudents.map((student) => {
        return {
            ...student,
            classId: classId,
            points:
                classPoints.find((point) => point.userId === student.id)
                    ?.points || 0,
        };
    });
    await checkForPoints(classStudents, classId);
    return students;
}
export default async function Page({ params }: { params: { id: string } }) {
    const session = await auth();
    if (!session) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <h1>You need to be signed in to access this page.</h1>
                <SignInButton session={session} />
            </div>
        );
    }
    const dbUser = await getUserById(session.user.id);
    if (!dbUser) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <h1>You need to be signed in to access this page.</h1>
                <SignInButton session={session} />
            </div>
        );
    }
    const hasAccess =
        (await isOwnClass(dbUser.id, params.id)) || dbUser.role === "admin";
    const currentClass = await getClassStudentsByClassId(params.id);
    if (!currentClass) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <h1>The class you are trying to edit does not exist.</h1>
            </div>
        );
    }
    if (!hasAccess) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <h1>You do not have elevated access to this class.</h1>
            </div>
        );
    }
    const data: UserWithClassId[] = await getData(
        params.id,
        currentClass.students,
        currentClass.Points,
    );
    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <h1>There are no students in this class.</h1>
                <Button>
                    <Link href={`/class/${currentClass.id}/invite`}>
                        Invite Students
                    </Link>
                </Button>
            </div>
        );
    }
    return (
        <section className="flex w-full flex-col items-center justify-center py-8">
            <h1 className="text-xl font-semibold">
                Students of {currentClass.name}
            </h1>
            <DataTable
                className="w-full px-8 md:px-24"
                data={data}
                columns={columns}
            />
        </section>
    );
}

type Params = Promise<{ id: string }>;

export async function generateMetadata({
    params,
}: {
    params: Params
}): Promise<Metadata> {
    const { id } = await params;
    const currentClass = await getClassById(id);
    const teacher = await getUserById(currentClass?.teacherUserId);
    if (!currentClass || !teacher) {
        return {
            title: "Class not found",
            description: "The class you are looking for does not exist",
            openGraph: {
                type: "website",
                title: "Join a class on WordShare!",
                description:
                    "Learn more about languages and prepare for your exam with WordShare",
                url: `https://www.wordshare.tech/class/${id}`,
            },
        };
    }
    return {
        title: `Students of ${currentClass.name}`,
        description: `Edit who can access ${currentClass.name}`,
        category: "education",
    };
}
