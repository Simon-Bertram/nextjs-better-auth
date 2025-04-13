"use server";

import { auth } from "@/lib/auth";

export const createUser = async ({ formData }: { formData: FormData }) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  await auth.api.signUpEmail({
    body: {
      name: name as string,
      email: email as string,
      password: password as string,
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
