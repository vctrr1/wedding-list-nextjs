import login from "@/actions/login";
import LoginButton from "@/components/login-button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="sm:w-[60%] w-[90%] border">
        <CardHeader className="">
          <CardTitle className="flex justify-end">
            <ThemeToggle />
          </CardTitle>
          <CardTitle className="flex justify-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={login} className="text-left ">
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
            <LoginButton label="Login" />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Link href="/register" className="text-base">
            Cadastrar-se
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
