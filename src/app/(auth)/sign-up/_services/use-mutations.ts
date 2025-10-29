import { signUp } from "@/app/(auth)/sign-up/_services/mutations";
import { SignUpSchema } from "@/app/(auth)/sign-up/_types/signUpSchema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useSignUp = () => {

  return useMutation({
    mutationFn: async (data: SignUpSchema) => {
      await signUp(data);
    },
    onSuccess: () => {
      toast.success("Sign up was successful. Please sign in.")
    }
  });
};

export { useSignUp };
