import { SignInForm } from "@/app/(auth)/sign-in/_components/sign-in-form";

const Page = async () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignInForm />
    </div>
  );
};

export default Page;
