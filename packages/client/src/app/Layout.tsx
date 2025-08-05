import { ModeToggle } from "@/components/mode-toggle";
import { Outlet } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between px-6 py-4">
                <h1 className="text-xl font-semibold tracking-tight">Syncellus</h1>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                </div>
            </header>
            <Separator decorative={true} />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};
