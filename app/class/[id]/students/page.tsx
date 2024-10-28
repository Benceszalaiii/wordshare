import {
    getAllStudents,
    getClassById,
    getClassStudentsByClassId,
    getUserById,
    isOwnClass,
} from "@/lib/db";
import { DataTable } from "./data-table";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { SignInButton } from "@/components/shared/buttons";
import { columns } from "./columns";
import { Metadata } from "next";

export interface UserWithClassId extends User {
    classId: string;
}

async function getData(classId: string): Promise<UserWithClassId[]> {
    //   const currentStudents = await getClassStudentsByClassId(classId);
    const students: UserWithClassId[] = await getAllStudents().then(
        (students) => {
            return students.map((student) => {
                return {
                    ...student,
                    classId: classId,
                };
            });
        },
    );
    //   if (currentStudents) {
    //   students.filter((student)=> {currentStudents.students.includes(student)});
    //   }
    return students;
}

export default async function Page({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
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
    const currentClass = await getClassById(params.id);
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
    const data = await getData(params.id);
    return (
        <section className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="text-xl font-semibold">
                Invite students to {currentClass.name}
            </h1>
            <DataTable
                className="w-full px-8 md:px-24"
                data={data}
                columns={columns}
            />
        </section>
    );
}

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    const currentClass = await getClassById(params.id);
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
                url: `https://www.wordshare.tech/class/${params.id}`,
            },
        };
    }
    return {
        title: `Students of ${currentClass.name}`,
        description: `Edit who can access ${currentClass.name}`,
        category: "education",
        creator: teacher.name,
    };
}
