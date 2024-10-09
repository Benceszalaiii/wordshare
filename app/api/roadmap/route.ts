import { deleteRoadmap, MarkRoadmapDone, MarkRoadmapUndone } from "@/lib/db";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
    const id = req.headers.get("id");
    if (!id) {
        return new Response(null, { status: 400, statusText: "No id provided" });
    }
    try{
        const parsed = parseInt(id);
        const res = await deleteRoadmap(parsed);
    }catch (e){
        return new Response(null, { status: 400, statusText: "Invalid id" });
    }
    return new Response(null, { status: 200, statusText: "Roadmap deleted" });
}

export async function POST(req: NextRequest){
    const method = req.headers.get("method");
    if (method === "done"){
        const id = req.headers.get("id");
        if (!id) {
            return new Response(null, { status: 400, statusText: "No id provided" });
        }
        try{
            const parsed = parseInt(id);
            const res = await MarkRoadmapDone(parsed);
        }catch (e){
            return new Response(null, { status: 400, statusText: "Invalid id" });
        }
        return new Response(null, { status: 200, statusText: "Roadmap updated" });
    }else if(method === "undo"){
        const id = req.headers.get("id");
        if (!id) {
            return new Response(null, { status: 400, statusText: "No id provided" });
        }
        try{
            const parsed = parseInt(id);
            const res = await MarkRoadmapUndone(parsed);
        }catch (e){
            return new Response(null, { status: 400, statusText: "Invalid id" });
        }
        return new Response(null, { status: 200, statusText: "Roadmap updated" });
}
return new Response(null, { status: 400, statusText: "Invalid method" });
}