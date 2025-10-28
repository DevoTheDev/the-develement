import { signUp } from "@/app/(auth)/sign-up/_services/mutations";
import { SignUpSchema } from "@/app/(auth)/sign-up/_types/signUpSchema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useSignUp = () => {

  return useMutation({
    mutationFn: async (data: SignUpSchema) => {
      toast.info(JSON.stringify(data))
      await signUp(data);
    },
  });
};

export { useSignUp };
