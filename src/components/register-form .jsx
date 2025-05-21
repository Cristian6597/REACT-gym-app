import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";

export function RegisterForm({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your email below to register to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              {/* Nome e Cognome sulla stessa riga */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="firstName">Name</Label>
                  <Input id="firstName" type="text" required />
                </div>
                <div className="flex-1">
                  <Label htmlFor="lastName">Lastname</Label>
                  <Input id="lastName" type="text" required />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  placeholder="+39 123 456 7890"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />

                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required />
              </div>

              <Button type="submit" className="w-full">
                Register
              </Button>
              <Button variant="outline" className="w-full">
                Register with Google
              </Button>

              <div className="mt-4 text-sm text-center">
                You do have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
