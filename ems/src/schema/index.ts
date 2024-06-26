import * as z from "zod";

export const SignUpSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    name: z.string().min(1, {
      message: "Please enter your name",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    phoneNumber: z.string().min(8, {
      message: "Phone number must be at least 8 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const EventFormSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .min(3, "Description must be at least 3 characters")
      .max(400, "Description must be less than 400 characters"),
    location: z
      .string()
      .min(3, "Location must be at least 3 characters")
      .max(400, "Location must be less than 400 characters"),
    imageUrl: z.string().min(1, "Upload an image"),
    eventDate: z.date(),
    registrationDeadline: z.date(),
    categoryId: z.string().min(1, "Choose a category"),
  })
  .refine((data) => data.registrationDeadline <= data.eventDate, {
    message: "Registration deadline must be before the event date",
    path: ["registrationDeadline"],
  });

export const ProfileFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  name: z.string().min(1, {
    message: "Please enter your name",
  }),
  phone_number: z.string().min(8, {
    message: "Phone number must be at least 8 characters long",
  }),
  home_address: z.string().nullable(),
  billing_address: z.string().nullable(),
  avatar_url: z.string().nullable(),
});
