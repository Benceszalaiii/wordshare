import { createClient } from "@supabase/supabase-js";
// Create Supabase client
export const supabase = createClient(
    process.env.SUPABASE_STORAGE_URL as string,
    process.env.SUPABASE_API_KEY as string,
);





export async function getEssayContent(essayId: string, authorId: string){
    const { data, error } = await supabase.storage
        .from("essays")
        .download(`${authorId}/${essayId}.txt`);

    if (!data) {
        console.error("Error downloading file: ", error.name);
        return "";
    }

    // Read the file content
    const text = await data.text(); // Assuming the file is a text file
    return text;
}

export async function uploadEssayContent(essayId: string, authorId: string, content: string){
    console.log("Attempting to upload file to Supabase... File path: ", `${authorId}/${essayId}.txt`);
    const {data, error} = await supabase.storage
        .from("essays")
        .upload(`${authorId}/${essayId}.txt`, await (new Blob([content])).arrayBuffer(), {contentType: "text/plain"});
    if (error?.message || !data) {
        console.error("Error uploading file: ", error.name, error.cause);
        return "";
    }
    return data;
}