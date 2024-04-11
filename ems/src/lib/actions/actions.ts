"use server";

import { supabase } from "@/utils/supabase/server";

export async function uploadImageToBucket(
  bucketName: string,
  storagePath: string,
  avatarFile: FormData
) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(storagePath, avatarFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error || !data) {
    console.log(error);
    return error.message;
  }

  return { data, error };
}
