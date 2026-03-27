import {
  PageContainer,
  PageHeader,
  PageHeaderContent,
  PageTitle,
  PageDescription,
  PageActions,
  PageContent,
} from "@/components/layout/page-container";
import { getHabitsAction } from "../actions/get-habits";
import { AddHabitButton } from "./add-habit-button";
import { HabitCard } from "./habit-card";
import { HabitFilters } from "./habit-filters";
import type { HabitStatusFilter } from "../types";

interface HabitsContentProps {
  query?: string;
  page: string;
  status?: HabitStatusFilter;
}

export async function HabitsContent({ query, page, status }: HabitsContentProps) {
  const result = await getHabitsAction({
    page: query ? "1" : page,
    limit: "20",
    query: query || "",
    status,
  });

  if (!result.success || !result.data) {
    return (
      <PageContainer>
        <PageHeader>
          <PageHeaderContent>
            <PageTitle>Hábitos</PageTitle>
            <PageDescription>Erro ao carregar hábitos</PageDescription>
          </PageHeaderContent>
        </PageHeader>
      </PageContainer>
    );
  }

  const { habits, totalPages, currentPage } = result.data;

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Hábitos</PageTitle>
          <PageDescription>
            Gerencie seus hábitos e acompanhe seu progresso diário
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddHabitButton />
        </PageActions>
      </PageHeader>

      <PageContent className="pt-4 space-y-10">
        {/* Filters and Search */}
        <HabitFilters currentQuery={query} currentStatus={status} />

        {habits.length === 0 ? (
          <EmptyState hasQuery={!!query || !!status} />
        ) : (
          <div className="space-y-10">
            {/* Habit list */}
            <div className="grid gap-4 w-full">
              {habits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            )}
          </div>
        )}
      </PageContent>
    </PageContainer>
  );
}

function EmptyState({ hasQuery }: { hasQuery: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-lg font-medium text-foreground">
        {hasQuery
          ? "Nenhum hábito encontrado"
          : "Nenhum hábito cadastrado"}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {hasQuery
          ? "Tente buscar por outro termo"
          : "Crie seu primeiro hábito para começar a acompanhar seu progresso"}
      </p>
      {!hasQuery && (
        <div className="mt-4">
          <AddHabitButton />
        </div>
      )}
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <a
          key={p}
          href={`?page=${p}`}
          className={`flex h-8 w-8 items-center justify-center rounded-md text-sm ${
            p === currentPage
              ? "bg-primary text-primary-foreground"
              : "border border-border hover:bg-accent"
          }`}
        >
          {p}
        </a>
      ))}
    </div>
  );
}
