import { SignUpForm } from "@/components/auth/signup-form";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <BackgroundBeams />
      <SignUpForm />
    </div>
  );
}
