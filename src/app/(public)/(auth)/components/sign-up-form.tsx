"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { signUpSchema, type SignUpFormData } from "../schemas/sign-up-schema";
import { authClient } from "@/lib/auth-client";

export function SignUpForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string>("");

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(data: SignUpFormData) {
    setFormError("");
    
    try {
      await authClient.signUp.email(
        {
          name: data.name,
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
            setFormError(ctx.error.message || "Erro ao criar conta. Tente novamente.");
          },
        }
      );
    } catch {
      setFormError("Erro ao criar conta. Tente novamente.");
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
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid ? "true" : "false"}>
            <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="text"
              placeholder="Seu nome completo"
              autoComplete="name"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.error && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

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
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.error && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="confirmPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid ? "true" : "false"}>
            <FieldLabel htmlFor={field.name}>Confirmar Senha</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="password"
              placeholder="Confirme sua senha"
              autoComplete="new-password"
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
        {form.formState.isSubmitting ? "Criando conta..." : "Criar Conta"}
      </Button>

      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          Já tem conta?{" "}
          <a href="/login" className="text-primary hover:underline">
            Entrar
          </a>
        </p>
      </div>
    </form>
  );
}
