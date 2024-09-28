import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function Home(){
    return(
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-[60%]">
                <CardHeader className="">
                    <CardTitle className="flex justify-end"><ThemeToggle/></CardTitle>
                    <CardTitle className="flex justify-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name" className="text-lg">Nome:</Label>
                          <Input id="name" placeholder="Seu nome" className="text-lg"/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name" className="text-lg">Senha:</Label>
                          <Input id="password" placeholder="Senha" className="text-lg" />
                        </div>
                      </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full text-base" >Logar</Button>
                    <Link href="/signIn">
                        Cadrastar-se
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}