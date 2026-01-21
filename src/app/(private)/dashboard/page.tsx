import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard | Habit Coach AI",
  description: "Bem-vindo ao seu painel de controle do Habit Coach AI",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Bem-vindo ao Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Comece a gerenciar seus hábitos e atingir seus objetivos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <span className="text-xl">📝</span>
            </div>
            <h3 className="font-semibold text-foreground">Meus Hábitos</h3>
            <p className="text-sm text-muted-foreground">
              Crie e acompanhe seus hábitos diários
            </p>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <span className="text-xl">🎯</span>
            </div>
            <h3 className="font-semibold text-foreground">Meus Objetivos</h3>
            <p className="text-sm text-muted-foreground">
              Defina e monitore seus objetivos
            </p>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <span className="text-xl">🤖</span>
            </div>
            <h3 className="font-semibold text-foreground">AI Coach</h3>
            <p className="text-sm text-muted-foreground">
              Receba orientações personalizadas da IA
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-8 bg-primary/5 border-primary/20">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Comece Agora</h3>
          <p className="text-muted-foreground">
            Sua jornada para transformar hábitos começa aqui. Clique em qualquer seção acima ou use o menu para começar.
          </p>
          <Button asChild size="lg">
            <a href="/habits">Criar Primeiro Hábito</a>
          </Button>
        </div>
      </Card>
    </div>
  );
}
