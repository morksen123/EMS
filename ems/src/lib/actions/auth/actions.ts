"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { SignInSchema, SignUpSchema } from "@/schema";

export async function signIn(formData: z.infer<typeof SignInSchema>) {
  const supabase = createClient();

  const userData = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signInWithPassword(userData);

  if (error) {
    return error.message;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUp(formData: z.infer<typeof SignUpSchema>) {
  const supabase = createClient();

  const userData = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        name: formData.name,
        phone_number: formData.phoneNumber,
      },
    },
  };
  const { error } = await supabase.auth.signUp(userData);

  if (error) {
    return error.message;
  }

  revalidatePath("/", "layout");
  redirect("/sign-in");
}

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "page");
  redirect("/sign-in");
}
