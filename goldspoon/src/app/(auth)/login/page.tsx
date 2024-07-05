import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";


export default function Login() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action="">
            <Input placeholder="Member Id" type="text" />
            <Input placeholder="Password" type="password" />
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center flex-col">
          {/* <Button variant={"outline"}>Create Account</Button> */}
          <p className="">Don't have a account?<a className="text-blue-500" href="/register"> Signup</a></p>
        </CardFooter>
      </Card>
    </div>
  );
}
