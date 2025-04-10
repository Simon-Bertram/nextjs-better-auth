"use client";

import { signIn, createUser } from "@/server/users";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  return (
    <div className="flex gap-4">
      <Button onClick={() => createUser()}>Create User</Button>
      <Button onClick={() => signIn()}>Sign In</Button>
    </div>
  );
}
