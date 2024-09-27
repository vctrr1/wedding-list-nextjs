import FormComponent from "@/components/form-component";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="h-screen flex flex-col items-center pt-4">
        <FormComponent/>
      </div>
    </div>
  );
}
