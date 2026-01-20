import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import MenuUser from "../components/MenuUser";

export default function UserLayout() {
    return (
        <div className="min-h-screen bg-primary">
            <Header />
            <MenuUser />
            <Outlet />
        </div>
    );
}