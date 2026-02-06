import {
  PageContainer,
  PageHeader,
  PageHeaderContent,
  PageContent,
} from "@/components/layout/page-container";
import { Skeleton } from "@/components/ui/skeleton";

export default function HabitPageLoading() {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-48" />
        </PageHeaderContent>
      </PageHeader>

      <PageContent>
        <div className="space-y-6">
          {/* Skeleton for habit list */}
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>

          {/* Skeleton for progress indicator */}
          <Skeleton className="h-4 w-32" />
        </div>
      </PageContent>
    </PageContainer>
  );
}
