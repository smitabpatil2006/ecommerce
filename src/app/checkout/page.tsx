import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { CheckoutForm } from "@/components/checkout-form";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Checkout | Nike Store",
};

export default async function CheckoutPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in?next=/checkout");

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-black uppercase tracking-tight">Checkout</h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Shipping to {session.user.email}
      </p>
      <CheckoutForm defaultName={session.user.name ?? ""} />
    </main>
  );
}
