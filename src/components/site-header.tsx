import { headers } from "next/headers";
import Link from "next/link";

import { CartButton } from "@/components/cart-button";
import { SignOutButton } from "@/components/sign-out-button";
import { Swoosh } from "@/components/swoosh";
import { auth } from "@/lib/auth";

const navLinks = ["New & Featured", "Men", "Women", "Kids", "Sale"];

export async function SiteHeader() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        <Link
          href="/"
          aria-label="Nike home"
          className="flex items-center gap-2 text-neutral-900 dark:text-white"
        >
          <Swoosh className="h-6 w-14" />
          <span className="sr-only">Nike</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 md:flex">
          {navLinks.map((link) => (
            <span
              key={link}
              className="cursor-default text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white"
            >
              {link}
            </span>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <CartButton />

          {session ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm font-medium text-neutral-700 sm:inline dark:text-neutral-300">
                {session.user.name || session.user.email}
              </span>
              <SignOutButton />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="rounded-full px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.03] hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                Join us
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
