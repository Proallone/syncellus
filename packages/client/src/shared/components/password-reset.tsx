import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { cn } from "@/shared/components/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export function PasswordResetForm({ className, ...props }: React.ComponentProps<"div">) {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const token = searchParams.get("token");

    const navigate = useNavigate();
    const { passwordReset } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const success = await passwordReset(token ? token : "", password); //TODO fix

        if (!success) {
            setError("Something went wrong!");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Password reset</CardTitle>
                    <CardDescription>Reset a password for your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Confirm Password</Label>
                                </div>
                                <Input id="password" type="password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} required />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Reset password
                                </Button>
                            </div>
                        </div>
                        {error && <p className="w-full text-center mt-4 text-red-600">{error}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
