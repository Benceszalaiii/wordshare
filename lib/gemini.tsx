"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
export async function getRandomTopic(level: "B2" | "C1") {
    const gemini = new GoogleGenerativeAI(process.env.GEMINI_KEY || "");
    const model = gemini.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { temperature: 1 },
    });
    const prompt = `Give me a random topic for a ${level} level essay that is common in language exams. Response with a single expression or a maximum of 1 sentence. Be creative`;
    const response = await model.generateContent(prompt);
    return response;
}
