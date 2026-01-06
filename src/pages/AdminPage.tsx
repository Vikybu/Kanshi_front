import Header from "../components/Header";
import Menu from '../components/Menu';
import { Outlet } from "react-router-dom";

export default function adminPage(){
    return (
        <>
        < Header />
        < Menu />
        <Outlet />
        </>
        
    )
}