import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  PageContainer,
  PageHeader,
  PageHeaderContent,
  PageTitle,
  PageDescription,
} from "@/components/layout/page-container";
import { BookOpen, Flame, Target, Sparkles, Clock } from "lucide-react";
import StatCard from "./components/stat-card";
import TaskItem from "./components/task-item";
import ActivityItem from "./components/activity-item";

export const metadata: Metadata = {
  title: "Dashboard | Habit Coach AI",
  description: "Bem-vindo ao seu painel de controle do Habit Coach AI",
};

export default function DashboardPage() {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <PageContainer>
      <PageHeader withBorder={false}>
        <PageHeaderContent>
          <div className="space-y-1">
            <PageTitle className="text-3xl sm:text-4xl font-semibold">
              Olá, Margaret
            </PageTitle>
            <PageDescription className="text-sm text-muted-foreground/80">
              Monitore o progresso da sua equipe aqui. Você está quase
              alcançando uma meta!
            </PageDescription>
          </div>
          <p className="text-sm text-muted-foreground/60 mt-2 flex items-center gap-2">
            {currentDate}
          </p>
        </PageHeaderContent>
      </PageHeader>

      <div className="space-y-8 px-6 py-8 sm:px-8 lg:px-10">
        {/* Stats Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            icon={Flame}
            label="Concluídos"
            value={18}
            trend={{ value: "+8 tarefas", isPositive: true }}
          />

          <StatCard
            icon={Clock}
            label="Monitorados"
            value="31h"
            trend={{ value: "-6 horas", isPositive: false }}
          />

          <StatCard
            icon={Target}
            label="Eficiência"
            value="93%"
            trend={{ value: "+12%", isPositive: true }}
          />
        </div>

        {/* Performance & Current Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Card */}
          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                Performance
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
              >
                01-07 Mai ↓
              </Button>
            </div>
            <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
              Gráfico de performance será exibido aqui
            </div>
          </Card>

          {/* Current Tasks Card */}
          <Card className="p-6 bg-card border-border/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Tarefas Atuais
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Concluído 30%
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
              >
                Semana ↓
              </Button>
            </div>

            <div className="space-y-3">
              <TaskItem
                icon={Sparkles}
                iconColor="text-yellow-600"
                iconBgColor="bg-yellow-100 dark:bg-yellow-950/20"
                title="Revisão de Produto para Mercado UI8"
                status={{
                  label: "Em progresso",
                  color: "text-orange-600 bg-orange-50 dark:bg-orange-950/20",
                  dotColor: "bg-orange-600",
                }}
                duration="4h"
              />

              <TaskItem
                icon={BookOpen}
                iconColor="text-blue-600"
                iconBgColor="bg-blue-100 dark:bg-blue-950/20"
                title="Pesquisa UX para Produto"
                status={{
                  label: "Em espera",
                  color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20",
                  dotColor: "bg-blue-600",
                }}
                duration="8h"
              />

              <TaskItem
                icon={Target}
                iconColor="text-emerald-600"
                iconBgColor="bg-emerald-100 dark:bg-emerald-950/20"
                title="Design e desenvolvimento de aplicativo"
                status={{
                  label: "Concluído",
                  color:
                    "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20",
                  dotColor: "bg-emerald-600",
                }}
                duration="32h"
              />
            </div>
          </Card>
        </div>

        {/* Activity Section */}
        <Card className="p-6 bg-card border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Atividade</h2>
          </div>

          <div className="space-y-4">
            <ActivityItem
              userName="Floyd Miles"
              userInitials="FM"
              avatarColor="bg-gradient-to-br from-primary/20 to-primary/10 text-primary"
              action="Comentou em Projeto Stark"
              timestamp="10:15 AM"
              isOnline
              content={
                <div className="p-3 rounded-lg bg-muted/30 text-sm text-foreground">
                  Oi! Na próxima semana vamos começar um novo projeto. Te conto
                  todos os detalhes mais tarde
                </div>
              }
            />

            <ActivityItem
              userName="Guy Hawkins"
              userInitials="GH"
              avatarColor="bg-gradient-to-br from-blue-500/20 to-blue-500/10 text-blue-600"
              action="Adicionou um arquivo ao Projeto 7Heroes"
              timestamp="10:15 AM"
              content={
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                  <div className="p-2 rounded bg-background">
                    <BookOpen className="size-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      Homepage.fig
                    </p>
                    <p className="text-xs text-muted-foreground">13.4 Mb</p>
                  </div>
                </div>
              }
            />

            <ActivityItem
              userName="Kristin Watson"
              userInitials="KW"
              avatarColor="bg-gradient-to-br from-purple-500/20 to-purple-500/10 text-purple-600"
              action="Comentou em Projeto 7Heroes"
              timestamp="10:15 AM"
            />
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
