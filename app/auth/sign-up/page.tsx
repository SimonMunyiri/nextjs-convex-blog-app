"use client";

import { signUpSchema } from "@/app/schema/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function SignUpPage() {
  // Initialize the form with react-hook-form and zod validation
  const form = useForm({
    resolver: zodResolver(signUpSchema), // Use the Zod schema for validation
    defaultValues: {
      email: "", // Default value for email field
      name: "", //    Default value for name field
      password: "", // Default value for password field
    },
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    await authClient.signUp.email({
      email: data.email,
      name: data.name,
      password: data.password,
    });
  }

  return (
    <div>
      <Card>
        <CardHeader>Sign Up</CardHeader>
        <CardDescription>Create an account to get started.</CardDescription>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Full Name</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      {...field}
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
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="john@example.com"
                      {...field}
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
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      type="password"
                      {...field}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button>Sign Up</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
