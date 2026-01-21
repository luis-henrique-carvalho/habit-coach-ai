import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Habit Coach AI</h1>
          <p className="text-muted-foreground mt-2">Transforme seus hábitos em resultados</p>
        </div>
        
        <Card className="p-6 shadow-lg">
          {children}
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2024 Habit Coach AI. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
