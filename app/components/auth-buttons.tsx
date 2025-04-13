"use client";

// import { signIn, createUser } from "@/server/users";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AuthButtons() {
  return (
    <div className="flex gap-4">
      <Button asChild>
        <Link href="/auth/sign-up">Create User</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/sign-in">Sign In</Link>
      </Button>
    </div>
  );
}
