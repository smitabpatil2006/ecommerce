import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { AuthCard } from "@/components/auth-card";
import { AuthForm } from "@/components/auth-form";
import { auth } from "@/lib/auth";

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect("/");
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to shop faster and track your orders."
    >
      <AuthForm mode="sign-in" />
    </AuthCard>
  );
}
