import { Skeleton } from "@/components/ui/skeleton";
import {
  PageContainer,
  PageHeader,
  PageHeaderContent,
  PageContent,
} from "@/components/layout/page-container";

export function HabitsLoading() {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-4 w-64" />
        </PageHeaderContent>
        <Skeleton className="h-10 w-40" />
      </PageHeader>

      <PageContent>
        {/* Search skeleton */}
        <Skeleton className="h-10 w-72" />

        {/* Checklist skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-16" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>

        {/* Card grid skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-40" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
}

export function HabitDetailLoading() {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-9 w-48" />
              <Skeleton className="h-4 w-80" />
            </div>
          </div>
        </PageHeaderContent>
      </PageHeader>

      <PageContent>
        {/* Stats skeleton */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>

        {/* Heatmap skeleton */}
        <Skeleton className="h-32 w-full rounded-xl" />

        {/* Chart skeleton */}
        <Skeleton className="h-64 w-full rounded-xl" />
      </PageContent>
    </PageContainer>
  );
}
