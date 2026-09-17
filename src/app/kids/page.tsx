import type { Metadata } from "next";

import { AudienceCatalog } from "@/components/audience-catalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kids | Nike Store",
};

export default async function KidsPage({
  searchParams,
}: PageProps<"/kids">) {
  const { category } = await searchParams;

  return (
    <AudienceCatalog
      audience="kids"
      category={typeof category === "string" ? category : undefined}
    />
  );
}
