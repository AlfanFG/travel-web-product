import { Card, CardContent, CardHeader } from "@/components/ui/card";
import logo from "@/assets/logo.png";
import LoginForm from "@/feature/auth/LoginForm";

export default function Login() {
  return (
    <Card className="w-md">
      <CardHeader className="flex w-full justify-center items-center flex-col">
        <img src={logo} width={120} height={120} />
        <p className="text-2xl font-black text-primary">TRAVELER</p>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
