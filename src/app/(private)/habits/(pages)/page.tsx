import {
  PageContainer,
  PageHeader,
  PageHeaderContent,
  PageTitle,
  PageDescription,
  PageActions,
  PageContent,
} from "@/components/layout/page-container";

import { CreateHabitButton } from "../components/create-habit-button";
import { HabitWithStats } from "../types/habbit";

export default async function HabitPage() {
  const { data } = await getDailyChecklistAction();

  const habits: HabitWithStats[] = data?.data?.habits || [];

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Today&apos;s Habits</PageTitle>
          <PageDescription>{today}</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <CreateHabitButton />
        </PageActions>
      </PageHeader>

      <PageContent>
        teste
      </PageContent>
    </PageContainer>
  );
}
