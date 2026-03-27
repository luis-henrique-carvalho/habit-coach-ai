import { Metadata } from "next";
import { Suspense } from "react";
import { HabitsContent } from "./components/habits-content";
import { HabitsLoading } from "./components/habits-loading";

import type { HabitStatusFilter } from "./types";

export const metadata: Metadata = {
  title: "Hábitos | Habit Coach AI",
  description: "Gerencie seus hábitos e acompanhe seu progresso",
};

export default async function HabitsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string; status?: HabitStatusFilter }>;
}) {
  const { query, page, status } = await searchParams;

  return (
    <Suspense fallback={<HabitsLoading />}>
      <HabitsContent query={query} page={page || "1"} status={status} />
    </Suspense>
  );
}
