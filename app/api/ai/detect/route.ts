import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
    const text = req.body;
    const token = process.env.FREEAI_TOKEN;
    const url = `https://www.freedetector.ai/api/content_detector/`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`},
        body: JSON.stringify({text: text})
        }
    );
    const data = await response.json();
    return {
        status: response.status,
        body: JSON.stringify({response: data})
    }
}