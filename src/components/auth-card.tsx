import type { ReactNode } from "react";

import { Swoosh } from "@/components/swoosh";

export function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <main className="flex flex-1 items-center justify-center bg-neutral-50 px-6 py-16 dark:bg-neutral-950">
      <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl shadow-neutral-900/5 sm:p-10 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-black/30">
        <Swoosh className="h-6 w-14 text-neutral-900 dark:text-white" />
        <h1 className="mt-6 text-2xl font-black uppercase tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 mb-8 text-sm text-neutral-500 dark:text-neutral-400">
          {subtitle}
        </p>
        {children}
      </div>
    </main>
  );
}
