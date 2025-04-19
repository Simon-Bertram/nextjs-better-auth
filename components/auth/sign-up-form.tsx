"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "../../components/icons";
import Link from "next/link";
import { Resolver } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password is too long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema) as Resolver<SignUpFormValues>,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: SignUpFormValues) {
    setIsLoading(true);
    setError(null);

    const { error } = await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: "/auth/sign-in",
      },
      {
        // Called when the request starts
        onRequest: () => {
          // Best practices:
          // 1. Show loading state
          setIsLoading(true);
          // 2. Clear any previous errors
          setError(null);
          // 3. Disable form inputs
          setFormDisabled(true);
        },
        // Called when the request succeeds
        onSuccess: () => {
          // Best practices:
          // 1. Show success message
          setSuccess(true);
          // 2. Reset form
          form.reset();
          // 3. Clear loading state
          setIsLoading(false);
          // 4. Handle redirects
          router.push("/dashboard");
        },
        // Called when the request fails
        onError: (ctx) => {
          // Best practices:
          // 1. Display error message
          setError(ctx.error.message);
          // 2. Clear loading state
          setIsLoading(false);
          // 3. Re-enable form
          setFormDisabled(false);
          // 4. Log error for debugging
          console.error("Sign-up error:", ctx.error);
        },
      }
    );

    if (error) {
      setError(
        error.message || "An error occurred during sign-up. Please try again."
      );
    }

    setIsLoading(false);
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to create your account
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>
            Account created successfully! Redirecting to sign-in...
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          aria-describedby="form-description"
        >
          <div id="form-description" className="sr-only">
            Sign up form with fields for name, email, password, and password
            confirmation. All fields are required.
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    disabled={formDisabled}
                    {...field}
                    aria-required="true"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    disabled={formDisabled}
                    {...field}
                    aria-required="true"
                  />
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
                  <Input
                    placeholder="Create a password"
                    type="password"
                    disabled={formDisabled}
                    {...field}
                    aria-required="true"
                  />
                </FormControl>
                <FormDescription>
                  Password must be at least 8 characters and include uppercase,
                  lowercase, number, and special character.
                </FormDescription>
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
                  <Input
                    placeholder="Confirm your password"
                    type="password"
                    disabled={formDisabled}
                    {...field}
                    aria-required="true"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={formDisabled}
            aria-label="Sign up"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign up
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
