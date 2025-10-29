"use client";
import { useSignIn } from "@/app/(auth)/sign-in/_services/use-mutations";
import {
  signInDefaultValues,
  signInSchema,
  SignInSchema,
} from "@/app/(auth)/sign-in/_types/signInSchema";
import { ThemeToggle } from "@/app/(dashboard)/_components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/controlled/controlled-input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type SignFormProps = {
  whiteSnow?: boolean
  blackSnow?: boolean
}

const SignInForm = ({
}: SignFormProps) => {
  const form = useForm<SignInSchema>({
    defaultValues: signInDefaultValues,
    resolver: zodResolver(signInSchema),
  });

  const signInMutation = useSignIn();

  const onSubmit: SubmitHandler<SignInSchema> = (data) => {
    signInMutation.mutate(data);
  };

  const formRender = () => {
    return (
      <FormProvider {...form}>
        <form
          className="flex flex-col items-center max-w-96 w-full space-y-5 rounded-md border px-10 py-8 backdrop-blur-xs overflow-clip"
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className="text-center">
            <h2 className="mb-1 text-2xl font-semibold">Welcome Back</h2>
            <p className="text-muted-foreground text-sm">
              Sign in to your account
            </p>
          </div>
          <div className="space-y-3 w-full">
            <ControlledInput<SignInSchema>
              name="email"
              placeholder="Enter your Username"
              label="Email"
            />
            <ControlledInput<SignInSchema>
              name="password"
              placeholder="Enter your Password"
              label="Password"
              type="password"
            />
          </div>

          <Button className="w-full" isLoading={signInMutation.isPending}>
            Sign In
          </Button>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-foreground/50 font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
          <ThemeToggle />
        </form>
      </FormProvider>
    )
  }

  return formRender();

};

export { SignInForm };
