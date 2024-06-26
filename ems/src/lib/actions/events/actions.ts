"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { EventInterface } from "@/components/events/EventForm";
import { IEvent, IEventAttendees } from "@/models";

const supabase = createClient();

export async function createEvent(eventFormData: EventInterface) {
  const eventData = {
    id: eventFormData.id,
    event_title: eventFormData.title,
    event_date: eventFormData.eventDate,
    event_location: eventFormData.location,
    event_description: eventFormData.description,
    registration_deadline: eventFormData.registrationDeadline,
    category_id: eventFormData.categoryId,
    image_url: eventFormData.imageUrl,
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
  redirect("/events/events-organized");
}

export async function deleteEvent(eventId: string) {
  const { data, error } = await supabase
    .from("event")
    .delete()
    .eq("id", eventId)
    .select();

  if (error) {
    console.log(error);
  }

  if (data) {
    return data[0].id;
  }
}

export async function getEventById(eventId: string) {
  const { error, data } = await supabase
    .from("event")
    .select()
    .eq("id", eventId);

  if (error) {
    redirect("/error");
  }

  return data[0] as IEvent;
}

export async function registerForEvent(eventId: string) {
  const { data, error } = await supabase
    .from("eventRegistration")
    .upsert({ event_id: eventId })
    .select("*");

  if (error) {
    console.log(error);
    return error.message;
  }

  return data;
}

export async function getEventAttendees(eventId: string) {
  const { data, error } = await supabase
    .from("eventRegistration")
    .select(
      `
      user_id,
      attended,
      profile: profiles (
        name, 
        email
      )
    `
    )
    .eq("event_id", eventId);

  if (error) {
    console.error("Error fetching event attendees:", error.message);
    return []; // Return an empty array or handle the error as needed
  }
  const attendees = data.map((item: any) => ({
    user_id: item.user_id,
    attended: item.attended,
    name: item.profile.name,
    email: item.profile.email,
  }));
  return attendees;
}

export async function unregisterForEvent(eventId: string, userId: string) {
  const { data, error } = await supabase
    .from("eventRegistration")
    .delete()
    .eq("event_id", eventId)
    .eq("user_id", userId);

  if (error) {
    console.log(error);
    return error.message;
  }

  return data;
}

export async function getRegisteredEvents(userId: string) {
  const { data, error } = await supabase
    .from("event")
    .select(
      `
          *,
          eventRegistration: eventRegistration!inner(*)
      `
    )
    .eq("eventRegistration.user_id", userId);

  if (error) {
    console.error("Error fetching registered events:", error);
    return [];
  }

  return data;
}
