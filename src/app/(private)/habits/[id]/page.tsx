import { Metadata } from "next";
import { Suspense } from "react";
import { HabitDetailContent } from "../components/habit-detail-content";
import { HabitDetailLoading } from "../components/habits-loading";

export const metadata: Metadata = {
  title: "Detalhe do Hábito | Habit Coach AI",
  description: "Visualize estatísticas e progresso do hábito",
};

export default async function HabitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<HabitDetailLoading />}>
      <HabitDetailContent id={id} />
    </Suspense>
  );
}
