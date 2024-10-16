import { createClient } from '@supabase/supabase-js'

// Create Supabase client
const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_API_KEY as string)

// Upload file using standard upload
export async function uploadFile() {
    const res = await fetch(process.env.NEXTAUTH_URL + '/bg1light.jpg');
    const fileblob = await res.blob();
    const file = new File([fileblob], 'bg1light.jpg', { type: 'image/jpeg' })
  const { data, error } = await supabase.storage.from('files').upload('file_path', file)
  if (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  } else {
    return new Response(JSON.stringify(data), { status: 200 })
  }
}
