import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { AuthCard } from "@/components/auth-card";
import { AuthForm } from "@/components/auth-form";
import { auth } from "@/lib/auth";

function safeNext(value: string | string[] | undefined) {
  return typeof value === "string" && value.startsWith("/") ? value : "/";
}

export default async function SignInPage({ searchParams }: PageProps<"/sign-in">) {
  const session = await auth.api.getSession({ headers: await headers() });
  const next = safeNext((await searchParams).next);

  if (session) {
    redirect(next);
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to shop faster and track your orders."
    >
      <AuthForm mode="sign-in" next={next} />
    </AuthCard>
  );
}
