import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <div>
            <header>Syncellus</header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};
