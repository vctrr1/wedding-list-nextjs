import { auth } from "@/auth";
import FormComponent from "@/components/form-component";
import Navbar from "@/components/navbar";
import { redirect } from "next/navigation";





export default async function Main() {
  const session = await auth()

  if(!session?.user?.id){
    redirect("/")
  }

  return (
    <div>
      <Navbar/>
      <div className="h-screen flex flex-col items-center pt-4">
        <FormComponent userId={session.user.id}/>
      </div>
    </div>
  );
}
