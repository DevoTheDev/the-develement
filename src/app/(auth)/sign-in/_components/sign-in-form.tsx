"use client";
import { useSignIn } from "@/app/(auth)/sign-in/_services/use-mutations";
import {
  signInDefaultValues,
  signInSchema,
  SignInSchema,
} from "@/app/(auth)/sign-in/_types/signInSchema";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/controlled/controlled-input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { loginAction } from "../_services/actions";

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
          action={loginAction}
          className="w-full max-w-96 space-y-5 rounded-md border px-10 py-12 backdrop-blur-xs"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="text-center">
            <h2 className="mb-1 text-2xl font-semibold">Welcome Back</h2>
            <p className="text-muted-foreground text-sm">
              Sign in to your account
            </p>
          </div>

          <div className="space-y-3">
            <ControlledInput<SignInSchema>
              className="text-white border-1 font-semibold rounded-md"
              name="email"
              label="Email"
            />
            <ControlledInput<SignInSchema>
              className="text-white border-1 font-semibold rounded-md"
              name="password"
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
              className="text-white/50 font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </FormProvider>
    )
  }

  return formRender();

};

export { SignInForm };
