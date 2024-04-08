"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { EventFormSchema } from "@/schema";

export async function createEvent(formData: z.infer<typeof EventFormSchema>) {
  const supabase = createClient();

  const eventData = {
    event_title: formData.title,
    event_date: formData.eventDate,
    event_location: formData.location,
    event_description: formData.description,
    registration_deadline: formData.registrationDeadline,
    category_id: formData.categoryId,
    image_url: formData.imageUrl,
  };

  const { data, error } = await supabase
    .from("event")
    .insert(eventData)
    .select("*");

  if (error) {
    console.log(error);
    return error.message;
  }

  revalidatePath("/", "layout");
  redirect("/");
}
