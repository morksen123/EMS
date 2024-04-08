"use server";

import { redirect } from "next/navigation";
import { supabase } from "@/utils/supabase/server";

export async function getUserProfile(userId: string) {
  const { error, data } = await supabase
    .from("profiles")
    .select("name, phone_number, avatar_url, email")
    .eq("id", userId);

  if (error || !data) {
    redirect("/error");
  }

  return data[0];
}
