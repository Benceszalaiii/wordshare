import ClassLegend from '@/components/class/legend';
import { Class } from '@prisma/client';
import { notFound } from 'next/navigation';
export default async function Page(){
    if (process.env.NODE_ENV !== 'development') return notFound();
    const currentClass: Class = {
        id: "123",
        name: "11C",
        language: "en",
        description: "11C RATATATATATA DESCRPIOTION DESCRIPTION",
        createdAt: new Date(),
        teacherId: "ofcofc",
        teacherUserId: "ofcofcofc"
    }
    return (
        <section className='flex flex-col items-center justify-center gap-4 w-full'>
            <ClassLegend currentClass={currentClass}></ClassLegend>
        </section>
    )
}