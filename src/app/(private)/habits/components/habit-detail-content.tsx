import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  PageContainer,
  PageHeader,
  PageHeaderContent,
  PageTitle,
  PageDescription,
  PageContent,
} from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { getHabitDetailAction } from "../actions/get-habit-detail";
import { HabitStats } from "./habit-stats";
import { HabitHeatmap } from "./habit-heatmap";
import { HabitTrendChart } from "./habit-trend-chart";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface HabitDetailContentProps {
  id: string;
}

const RECURRENCE_LABELS: Record<string, string> = {
  daily: "Diário",
  weekly: "Dias específicos",
  weekly_count: "X vezes por semana",
};

export async function HabitDetailContent({ id }: HabitDetailContentProps) {
  const result = await getHabitDetailAction({ id });

  if (!result.success || !result.data) {
    return (
      <PageContainer>
        <PageContent>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg font-medium text-foreground">
              Hábito não encontrado
            </p>
            <Link href="/habits" className="mt-4">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
          </div>
        </PageContent>
      </PageContainer>
    );
  }

  const habit = result.data;

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <div className="flex items-center gap-3">
            <Link href="/habits">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <PageTitle>{habit.name}</PageTitle>
              <PageDescription>
                {habit.description && `${habit.description} · `}
                {RECURRENCE_LABELS[habit.recurrenceType] || habit.recurrenceType}
                {" · "}
                Criado em{" "}
                {format(habit.createdAt, "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </PageDescription>
            </div>
          </div>
        </PageHeaderContent>
      </PageHeader>

      <PageContent>
        <HabitStats stats={habit.stats} />

        <HabitHeatmap
          executions={habit.executions}
          recurrenceType={habit.recurrenceType}
          recurrenceWeekdays={habit.recurrenceWeekdays}
          createdAt={habit.createdAt}
        />

        <HabitTrendChart data={habit.weeklyTrend} />
      </PageContent>
    </PageContainer>
  );
}
