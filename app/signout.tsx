"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function SignOut() {
  return (
    <div>
      <Button onClick={() => authClient.signOut()}>Sign Out</Button>
    </div>
  );
}
