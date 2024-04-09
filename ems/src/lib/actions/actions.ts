"use server";

import { supabase } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    redirect("/error");
  }

  return { data, error };
}
