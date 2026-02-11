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
import { HabitChecklist } from "./habit-checklist";

interface HabitsContentProps {
  query?: string;
  page: string;
}

export async function HabitsContent({ query, page }: HabitsContentProps) {
  const result = await getHabitsAction({
    page: query ? "1" : page,
    limit: "20",
    query: query || "",
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

      <PageContent>
        {/* Search */}
        <SearchForm defaultValue={query} />

        {habits.length === 0 ? (
          <EmptyState hasQuery={!!query} />
        ) : (
          <>
            {/* Today's checklist */}
            <HabitChecklist habits={habits} />

            {/* All habits grid */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                Todos os hábitos
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {habits.map((habit) => (
                  <HabitCard key={habit.id} habit={habit} />
                ))}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            )}
          </>
        )}
      </PageContent>
    </PageContainer>
  );
}

function SearchForm({ defaultValue }: { defaultValue?: string }) {
  return (
    <form method="get" className="max-w-sm">
      <input
        type="text"
        name="query"
        defaultValue={defaultValue}
        placeholder="Buscar hábitos..."
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
    </form>
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
