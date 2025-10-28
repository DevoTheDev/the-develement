import { signInAction, signOutAction } from "@/app/(auth)/sign-in/_services/mutations";
import { SignInSchema } from "@/app/(auth)/sign-in/_types/signInSchema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useSignIn = () => {
  return useMutation({
    mutationFn: async (data: SignInSchema) => {
      await signInAction(data);
    },
    onSuccess: (e: any) => {
      toast.success(JSON.stringify(e))
    }
  });
};

const useSignOut = () => {

  return useMutation({
    mutationFn: signOutAction,
    onSuccess: () => {
    },
  });
};

export { useSignIn, useSignOut };
