"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { reviews } from "@/db/schema";
import { auth } from "@/lib/auth";

export type ReviewResult = { ok: boolean; error?: string };

export async function submitReview(input: {
  productId: string;
  slug: string;
  rating: number;
  comment: string;
}): Promise<ReviewResult> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { ok: false, error: "Sign in to leave a review." };
  }

  const rating = Math.round(input.rating);
  if (rating < 1 || rating > 5) {
    return { ok: false, error: "Pick a rating between 1 and 5 stars." };
  }

  const comment = input.comment.trim();
  if (comment.length < 3) {
    return { ok: false, error: "Add a short comment about the product." };
  }

  await db.insert(reviews).values({
    productId: input.productId,
    userId: session.user.id,
    authorName: session.user.name || session.user.email,
    rating,
    comment,
  });

  revalidatePath(`/products/${input.slug}`);
  return { ok: true };
}
