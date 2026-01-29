import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  Flame,
  Target,
  Sparkles,
  TrendingUp,
  Clock,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard | Habit Coach AI",
  description: "Bem-vindo ao seu painel de controle do Habit Coach AI",
};

export default function DashboardPage() {
  const streakDays = 12;
  const totalHabits = 3;
  const completionRate = 87;

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="px-6 py-8 sm:px-8 lg:px-10 border-b border-border/40">
        <div className="animate-slide-in-up">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
            Bem-vindo de volta
          </h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
            Acompanhe seu progresso e mantenha-se motivado na sua jornada de
            transformação de hábitos
          </p>
        </div>
      </div>

      <div className="px-6 py-8 sm:px-8 lg:px-10 max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Streak Card */}
          <Card
            className="overflow-hidden border-border/40 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="relative p-6 bg-linear-to-br from-primary/5 to-transparent">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

              <div className="relative space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <Flame className="size-6 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Sequência Atual
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      {streakDays}
                    </span>
                    <span className="text-sm text-muted-foreground">dias</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Mantenha a consistência para expandir seus recordes
                </p>
              </div>
            </div>
          </Card>

          {/* Total Habits Card */}
          <Card
            className="overflow-hidden border-border/40 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative p-6 bg-linear-to-br from-primary/5 to-transparent">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

              <div className="relative space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <Target className="size-6 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Hábitos Ativos
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      {totalHabits}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      em andamento
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Construa novos hábitos em apenas 21 dias
                </p>
              </div>
            </div>
          </Card>

          {/* Completion Rate Card */}
          <Card
            className="overflow-hidden border-border/40 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative p-6 bg-linear-to-br from-primary/5 to-transparent">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

              <div className="relative space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <TrendingUp className="size-6 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Taxa de Conclusão
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      {completionRate}%
                    </span>
                  </div>
                </div>

                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Quick Start Card */}
          <Card
            className="overflow-hidden border-border/40 hover:border-primary/30 transition-all duration-300 group"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="p-8 bg-linear-to-br from-card to-card/50 relative">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
              </div>

              <div className="relative space-y-5">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/15 group-hover:bg-primary/25 transition-colors">
                  <Sparkles className="size-7 text-primary" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Crie seu primeiro hábito
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Comece pequeno, pense grande. Escolha um hábito simples e
                    construa a partir daí.
                  </p>
                </div>

                <Button
                  asChild
                  className="w-full group/btn bg-primary hover:bg-primary/90 transition-all duration-200"
                >
                  <a href="/habits" className="flex items-center justify-between">
                    <span>Novo Hábito</span>
                    <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>

          {/* AI Coach Card */}
          <Card
            className="overflow-hidden border-border/40 hover:border-primary/30 transition-all duration-300 group"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="p-8 bg-linear-to-br from-card to-card/50 relative">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
              </div>

              <div className="relative space-y-5">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/15 group-hover:bg-primary/25 transition-colors">
                  <BookOpen className="size-7 text-primary" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Receba orientações personalizadas
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Seu AI Coach ajusta estratégias com base no seu progresso
                    real.
                  </p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-border hover:border-primary/50 transition-all duration-200"
                >
                  <a href="/ai-coach" className="flex items-center justify-between">
                    <span>Conversar com IA</span>
                    <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity Section */}
        <Card
          className="border-border/40 overflow-hidden"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="p-8 border-b border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-1">
                  Atividade Recente
                </h2>
                <p className="text-sm text-muted-foreground">
                  Seus últimos movimentos nesta semana
                </p>
              </div>
              <Clock className="size-5 text-muted-foreground/60" />
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-4 text-center py-12">
              <p className="text-muted-foreground">
                Nenhuma atividade registrada ainda
              </p>
              <p className="text-sm text-muted-foreground/70">
                Comece a registrar seus hábitos para ver o histórico aqui
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
