import { Link } from "react-router-dom";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Bus } from "lucide-react";

export function SignUpPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-blue-900 text-primary-foreground" />
        <div className="relative z-20 flex items-center justify-center text-lg font-medium">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-white hover:text-gray-200"
          >
            <Bus className="h-8 w-8 mx-auto" />
            BusTrip
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Viaje com conforto e segurança pelos melhores preços do mercado."
            </p>
            <footer className="text-sm">― BusTrip</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="lg:hidden flex items-center justify-center gap-2 text-2xl font-bold text-primary mb-8">
            <Bus className="h-8 w-8" />
            BusTrip
          </div>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar uma conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Preencha os dados abaixo para criar sua conta
            </p>
          </div>
          <SignUpForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
