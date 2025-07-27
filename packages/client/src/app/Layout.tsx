import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <div>
            <header>✅ Header / Nav</header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};
