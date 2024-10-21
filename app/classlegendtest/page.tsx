import ClassLegend from '@/components/class/legend';
import { Class } from '@prisma/client';
export default async function Page(){

    const currentClass: Class = {
        id: "6969",
        name: "11C",
        language: "en",
        description: "11C RATATATATATA DESCRPIOTION DESCRIPTION",
        createdAt: new Date(),
        teacherId: "ofcofc",
        teacherUserId: "ofcofcofc"
    }
    return (
        <section className='flex flex-col items-center justify-center gap-4 w-full'>
            <ClassLegend canEdit currentClass={currentClass}></ClassLegend>
        </section>
    )
}