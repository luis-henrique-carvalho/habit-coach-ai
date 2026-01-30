import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Habit | Habit Coach AI",
  description: "Bem-vindo ao seu painel de controle do Habit Coach AI",
};

export default function HabitPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Bem-vindo ao seu Painel de Controle</h1>
    </main>
  );
}
