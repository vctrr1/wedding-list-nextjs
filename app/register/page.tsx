"use client";

import register from "@/actions/register";
import LoginButton from "@/components/login-button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Register() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Pegando os dados do formulário
    const formData = new FormData(e.currentTarget);

    // Chamando a server action e recebendo o resultado
    const result = await register(formData);
    if (result.success) {
      toast.success(result.message); // Exibe o toast de sucesso
      router.push("/"); // Redireciona para a página de login
    } else {
      toast.error(result.message); // Exibe o toast de erro
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="sm:w-[60%] w-[90%] border">
        <CardHeader className="">
          <CardTitle className="flex justify-end">
            <ThemeToggle />
          </CardTitle>
          <CardTitle className="flex items-center justify-center gap-2">
            Cadastre-se
          </CardTitle>
          <CardDescription className="flex items-center justify-center text-base">
            Crie uma conta gratuitamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="text-left">
            <div className="space-y-6 mb-5">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name" className="text-lg">
                  Nome:
                </Label>
                <Input
                  className="text-base"
                  name="name"
                  type="name"
                  id="name"
                  placeholder="Seu nome"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password" className="text-lg">
                  Senha:
                </Label>
                <Input
                  className="text-base"
                  name="password"
                  type="password"
                  id="password"
                  placeholder="********"
                />
              </div>
            </div>
            <LoginButton label="Criar conta" />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Link href="/" className="text-base">
            Voltar para Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
