import { ReactNode } from "react";
import { SignOutButton } from "@/components/sign-out-button";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Habit Coach AI</h1>
            <p className="text-sm text-muted-foreground">Painel de Controle</p>
          </div>
          <SignOutButton />
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {children}
      </main>
    </div>
  );
}
