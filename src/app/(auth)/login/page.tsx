import { LoginForm } from "@/components/auth/login-form";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <BackgroundBeams />
      <LoginForm />
    </div>
  );
}
