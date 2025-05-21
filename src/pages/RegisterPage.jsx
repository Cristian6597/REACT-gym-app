import { RegisterForm } from "@/components/register-form ";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
      <div className="w-full max-w-2xl">
        <RegisterForm />
      </div>
    </div>
  );
}
