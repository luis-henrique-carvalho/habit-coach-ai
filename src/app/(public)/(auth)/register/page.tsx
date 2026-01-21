import { Metadata } from "next";
import { SignUpForm } from "../components/sign-up-form";
import { OAuthButtons } from "../components/o-auth-buttons";

export const metadata: Metadata = {
  title: "Criar Conta | Habit Coach AI",
  description: "Crie uma conta no Habit Coach AI",
};

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Criar Conta</h2>
        <p className="text-muted-foreground text-sm mt-2">
          Comece sua jornada de transformação de hábitos
        </p>
      </div>

      <SignUpForm />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-muted" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            ou inscreva-se com
          </span>
        </div>
      </div>

      <OAuthButtons />
    </div>
  );
}
