import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AuthButtons } from "@/app/components/auth-buttons";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <AuthButtons />
      <div>
        {!session ? (
          <p>No session</p>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Welcome, {session.user.name}!
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">User Details:</h3>
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(session.user, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
