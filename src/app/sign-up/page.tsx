import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { AuthCard } from "@/components/auth-card";
import { AuthForm } from "@/components/auth-form";
import { auth } from "@/lib/auth";

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect("/");
  }

  return (
    <AuthCard
      title="Become a member"
      subtitle="Create an account for members-only products and pricing."
    >
      <AuthForm mode="sign-up" />
    </AuthCard>
  );
}
