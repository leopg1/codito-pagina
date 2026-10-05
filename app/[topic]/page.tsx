import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicPage } from "@/components/site/topic-page";
import { TOPICS } from "@/lib/topics";

export const dynamicParams = false;
export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const t = TOPICS.find((x) => x.slug === topic);
  if (!t) return {};
  return { title: t.title, description: t.description, alternates: { canonical: `/${t.slug}/` }, openGraph: { title: t.title, description: t.description, images: ["/og.png"] } };
}

export default async function Page({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const t = TOPICS.find((x) => x.slug === topic);
  if (!t) notFound();
  return <TopicPage t={t} />;
}
