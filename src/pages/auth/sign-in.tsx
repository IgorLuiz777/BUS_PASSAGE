import { Link } from "react-router-dom";
import { SignInForm } from "@/components/auth/sign-in-form";

export function SignInPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link to="/" className="flex items-center">
            BusTrip
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Viaje com conforto e segurança pelos melhores preços do mercado."
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Entrar na sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Digite seu e-mail e senha para entrar
            </p>
          </div>
          <SignInForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link
              to="/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}