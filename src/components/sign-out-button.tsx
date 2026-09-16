"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { signOut } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  return (
    <button
      type="button"
      disabled={pending}
      onClick={async () => {
        setPending(true);
        await signOut();
        setPending(false);
        router.refresh();
      }}
      className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-white dark:hover:bg-white dark:hover:text-neutral-900"
    >
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
