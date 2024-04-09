"use server";

import { redirect } from "next/navigation";
import { supabase } from "@/utils/supabase/server";
import { ProfileFormSchema } from "@/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function getUserProfile(userId: string) {
  const { error, data } = await supabase
    .from("profiles")
    .select(
      "name, phone_number, avatar_url, email, home_address, billing_address"
    )
    .eq("id", userId);

  if (error || !data) {
    redirect("/error");
  }

  return data[0];
}

export async function updateUserProfile(
  formData: z.infer<typeof ProfileFormSchema>,
  userId: string
) {
  const { data, error } = await supabase
    .from("profiles")
    .upsert({ id: userId, ...formData })
    .select();

  if (error || !data) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/profile");
}
