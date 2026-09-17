import type { Metadata } from "next";

import { AudienceCatalog } from "@/components/audience-catalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Men | Nike Store",
};

export default async function MenPage({
  searchParams,
}: PageProps<"/men">) {
  const { category } = await searchParams;

  return (
    <AudienceCatalog
      audience="men"
      category={typeof category === "string" ? category : undefined}
    />
  );
}
