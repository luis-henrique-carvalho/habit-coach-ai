"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { signInSchema, type SignInFormData } from "../schemas/sign-in-schema";
import { authClient } from "@/lib/auth-client";

export function SignInForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string>("");

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  async function onSubmit(data: SignInFormData) {
    setFormError("");
    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => {
            // Loading state handled by form.formState.isSubmitting
          },
          onSuccess: () => {
            router.push("/dashboard");
          },
          onError: (ctx) => {
            setFormError(ctx.error.message || "Erro ao conectar. Tente novamente.");
          },
        }
      );
    } catch {
      setFormError("Erro ao conectar. Tente novamente.");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {formError && (
        <Alert variant="destructive">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid ? "true" : "false"}>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.error && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid ? "true" : "false"}>
            <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="password"
              placeholder="Sua senha"
              autoComplete="current-password"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.error && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="w-full"
      >
        {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
      </Button>

      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          Não tem conta?{" "}
          <a href="/register" className="text-primary hover:underline">
            Criar conta
          </a>
        </p>
      </div>
    </form>
  );
}
