import type { Metadata } from "next";

import { AudienceCatalog } from "@/components/audience-catalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Women | Nike Store",
};

export default async function WomenPage({
  searchParams,
}: PageProps<"/women">) {
  const { category } = await searchParams;

  return (
    <AudienceCatalog
      audience="women"
      category={typeof category === "string" ? category : undefined}
    />
  );
}
