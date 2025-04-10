"use server";

import { auth } from "@/lib/auth";

export const createUser = async () => {
  await auth.api.signUpEmail({
    body: {
      name: "test",
      email: "test@test.com",
      password: "Perfect-password123",
    },
  });
};

export const signIn = async () => {
  await auth.api.signInEmail({
    body: {
      email: "test@test.com",
      password: "Perfect-password123",
    },
  });
};
