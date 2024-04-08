"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { SignUpSchema } from "@/schema";
import { signUp } from "@/lib/actions/auth/actions";
import AuthFormWrapper from "./AuthFormWrapper";
import { signUpFormDefaultValues } from "@/constants";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: signUpFormDefaultValues,
  });

  const handleUserSignUp = async (data: z.infer<typeof SignUpSchema>) => {
    setLoading(true);
    const errorMessage = await signUp(data);

    if (errorMessage) {
      setErrorMessage(errorMessage);
      setLoading(false);
    }
  };

  const isFormSubmitting = form.formState.isSubmitting;

  return (
    <AuthFormWrapper
      title="Register"
      backButtonHref="/sign-in"
      backButtonLabel="Already have an account? Login here."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUserSignUp)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMessage && (
              <p className="text-sm font-medium text-destructive">
                {errorMessage}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isFormSubmitting}>
            {isFormSubmitting ? "Processing..." : "Register"}
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  );
};

export default SignUpForm;
