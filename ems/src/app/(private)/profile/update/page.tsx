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
import { z } from "zod";
import { useEffect, useState } from "react";
import { ProfileFormSchema } from "@/schema";
import { UserProfile } from "@/app/(private)/profile/page";
import {
  getUserProfile,
  updateUserProfile,
} from "@/lib/actions/profile/actions";
import { useUser } from "@/contexts/UserContext";
import { uploadImageToBucket } from "@/lib/actions/actions";
import { buildFormDataFromFile, buildMediaStoragePath } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FileUploader } from "@/components/shared/FileUploader";
import { Button } from "@/components/ui/button";
import { profileFormDefaultValues } from "@/constants";
import Link from "next/link";

const UpdateUserProfile = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [defaultFormValues, setDefaultFormValues] = useState<UserProfile>(
    profileFormDefaultValues
  );
  const { user } = useUser();
  const form = useForm({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userData = (await getUserProfile(user.id)) as UserProfile;
        userData.billing_address = userData.billing_address ?? "";
        userData.home_address = userData.home_address ?? "";
        userData.avatar_url = "";
        setDefaultFormValues(userData);
        form.reset(userData);
      }
    };

    fetchUserProfile();
  }, [user, form]);

  const handleUpdateProfile = async (
    formData: z.infer<typeof ProfileFormSchema>
  ) => {
    if (!user) return;

    try {
      let updatedProfilePayload = { ...formData };

      if (files.length > 0) {
        const fileName = files[0].name;
        updatedProfilePayload.avatar_url = fileName;
        const storagePath = buildMediaStoragePath(user.id, fileName);
        const fileFormData = buildFormDataFromFile(files[0]);
        await uploadImageToBucket("avatars", storagePath, fileFormData);
      }

      await updateUserProfile(updatedProfilePayload, user.id);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const isFormSubmitting = form.formState.isSubmitting;

  return (
    <div className="wrapper">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateProfile)}
          className="space-y-6"
        >
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Name"
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
              name="phone_number"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Phone Number"
                      {...field}
                      className="input-field"
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
              name="avatar_url"
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
              name="home_address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Input
                        placeholder="Home Address"
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
            <FormField
              control={form.control}
              name="billing_address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Input
                        placeholder="Billing Address"
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
          <div className="flex gap-2 justify-end">
            <Link href="/profile">
              <Button
                type="submit"
                className="min-w-20 rounded-full"
                variant="secondary"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="min-w-20 rounded-full "
              disabled={isFormSubmitting}
            >
              {isFormSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateUserProfile;
