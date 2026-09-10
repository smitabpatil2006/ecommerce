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
      className="rounded-full border border-black/15 px-4 py-1.5 text-sm font-medium disabled:opacity-50 dark:border-white/20"
    >
      Sign out
    </button>
  );
}
