"use server";

import { auth } from "@/lib/auth";

export async function signInWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Sign-in error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred during sign-in",
    };
  }
}
