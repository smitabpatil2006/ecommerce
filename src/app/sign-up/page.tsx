import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { AuthCard } from "@/components/auth-card";
import { AuthForm } from "@/components/auth-form";
import { auth } from "@/lib/auth";

function safeNext(value: string | string[] | undefined) {
  return typeof value === "string" && value.startsWith("/") ? value : "/";
}

export default async function SignUpPage({ searchParams }: PageProps<"/sign-up">) {
  const session = await auth.api.getSession({ headers: await headers() });
  const next = safeNext((await searchParams).next);

  if (session) {
    redirect(next);
  }

  return (
    <AuthCard
      title="Become a member"
      subtitle="Create an account for members-only products and pricing."
    >
      <AuthForm mode="sign-up" next={next} />
    </AuthCard>
  );
}
