"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { submitReview } from "@/app/products/[slug]/actions";

export function ReviewForm({
  productId,
  slug,
  signedIn,
}: {
  productId: string;
  slug: string;
  signedIn: boolean;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!signedIn) {
    return (
      <p className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
        <Link href="/sign-in" className="font-semibold underline">
          Sign in
        </Link>{" "}
        to write a review.
      </p>
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await submitReview({ productId, slug, rating, comment });
      if (result.ok) {
        setComment("");
        setRating(5);
        setDone(true);
      } else {
        setError(result.error ?? "Could not save your review.");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800"
    >
      <p className="text-sm font-semibold uppercase tracking-wide">
        Write a review
      </p>

      <div className="mt-3 flex items-center gap-1" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={rating === value}
            aria-label={`${value} star${value === 1 ? "" : "s"}`}
            onClick={() => setRating(value)}
            className={`text-2xl leading-none transition-transform hover:scale-110 ${
              value <= rating
                ? "text-orange-500"
                : "text-neutral-300 dark:text-neutral-700"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        rows={3}
        placeholder="How did they fit? How do they feel?"
        className="mt-4 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-white"
      />

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
        >
          {error}
        </p>
      )}
      {done && !error && (
        <p className="mt-3 text-sm font-medium text-green-700 dark:text-green-400">
          Thanks — your review is live.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-4 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-neutral-900"
      >
        {pending ? "Posting…" : "Post review"}
      </button>
    </form>
  );
}
