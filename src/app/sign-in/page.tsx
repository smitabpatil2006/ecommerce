import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { AuthForm } from "@/components/auth-form";
import { auth } from "@/lib/auth";

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect("/");
  }

  return (
    <main className="mx-auto flex max-w-sm flex-col gap-6 px-6 py-16">
      <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
      <AuthForm mode="sign-in" />
    </main>
  );
}
