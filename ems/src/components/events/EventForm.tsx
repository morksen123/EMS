"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useState } from "react";
import { EventFormSchema } from "@/schema";
import { eventCategories, eventDefaultValues } from "@/constants";
import Dropdown from "../shared/Dropdown";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { FileUploader } from "../shared/FileUploader";
import CalendarFormInput from "../shared/Calendar";
import { createEvent } from "@/lib/actions/events/actions";
import { buildFormDataFromFile, buildMediaStoragePath } from "@/lib/utils";
import { uploadImageToBucket } from "@/lib/actions/actions";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export type EventInterface = z.infer<typeof EventFormSchema> & {
  id?: string;
};

const EventForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm({
    resolver: zodResolver(EventFormSchema),
    defaultValues: eventDefaultValues,
  });

  const handleCreateEvent = async (
    formData: z.infer<typeof EventFormSchema>
  ) => {
    try {
      let eventPayload = { ...formData } as EventInterface;

      if (files.length > 0) {
        const fileName = files[0].name;
        eventPayload.imageUrl = fileName;
        eventPayload.id = uuidv4();
        const storagePath = buildMediaStoragePath(eventPayload.id, fileName);
        const fileFormData = buildFormDataFromFile(files[0]);
        await uploadImageToBucket("events", storagePath, fileFormData);
      }

      await createEvent(eventPayload);
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  const isFormSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateEvent)}
        className="space-y-6"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Event title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    options={eventCategories}
                    onChangeHandler={(selectedId) => field.onChange(selectedId)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/location.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                    />

                    <Input
                      placeholder="Event location or Online"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <CalendarFormInput
            placeholder="Event Date"
            inputName="eventDate"
            {...form}
          />
          <CalendarFormInput
            placeholder="Registration Deadline"
            inputName="registrationDeadline"
            {...form}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button
            asChild
            type="submit"
            className="min-w-20 rounded-full"
            variant="secondary"
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            type="submit"
            className="min-w-20 rounded-full"
            disabled={isFormSubmitting}
          >
            {isFormSubmitting ? "Submitting..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
