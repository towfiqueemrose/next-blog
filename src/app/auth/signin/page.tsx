
import SignInContainer from "@/components/SignIn";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-start justify-center p-4 pt-20">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl">
        <h1 className="h1 text-center">Sign In</h1>
        <SignInContainer />
      </div>
    </div>
  );
}