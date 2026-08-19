import { redirect } from "next/navigation";

export default async function TopLevelDownloadPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/pt/download/${slug}`);
}
