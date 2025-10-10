import { CircleCheckBig } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/shared/components/mode-toggle";
import { Separator } from "@/shared/components/ui/separator";

export const Layout = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            <header className="flex items-center justify-between px-6 py-4">
                <div
                    className="flex items-center gap-2 hover:cursor-pointer hover:text-primary/90"
                    onClick={() => {
                        navigate("/dashboard");
                    }}
                >
                    <CircleCheckBig size={40} className="text-primary hover:text-primary/9" />
                    <h1 className="text-xl font-semibold tracking-tight">Syncellus</h1>
                </div>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                </div>
            </header>
            <Separator decorative={true} />
            <main className="flex-1 p-6 overflow-y-clip">
                <Outlet />
            </main>
        </div>
    );
};
