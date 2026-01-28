import DisplayAdmin from "@/components/DisplayAdmin";
import Header from "../components/Header";
import Menu from '../components/MenuAdmin';
import { Outlet, useLocation } from "react-router-dom";

export default function AdminPageLayout() {
  const location = useLocation();

  const isMainPage = location.pathname === "/admin";

  return (
    <>
      <Header />
      <Menu />
      <Outlet />
      {isMainPage && <DisplayAdmin />}
    </>
  );
}