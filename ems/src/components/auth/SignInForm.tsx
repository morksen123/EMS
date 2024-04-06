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
import { SignInSchema } from "@/schema";
import AuthFormWrapper from "./AuthFormWrapper";
import { signIn } from "@/app/auth/actions";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleUserSignIn = async (data: z.infer<typeof SignInSchema>) => {
    setLoading(true);
    const errorMessage = await signIn(data);

    if (errorMessage) {
      setErrorMessage(errorMessage);
      setLoading(false);
    }
  };

  const { pending } = useFormStatus();
  return (
    <AuthFormWrapper
      title="Login"
      backButtonHref="/sign-up"
      backButtonLabel="Don't have an account? Register here."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUserSignIn)}
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
            {errorMessage && (
              <p className="text-sm font-medium text-destructive">
                {errorMessage}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  );
};

export default SignInForm;
