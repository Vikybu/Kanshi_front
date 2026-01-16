import login from '../api/login.ts';
import {useUserStore} from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginForm from "../molecules/LoginForm.tsx"

export default function Login() {

    const [registration_number, setRegistration_number] = useState("");
    const [password, setPassword] = useState("");

    const { setUser} = useUserStore()
    const navigate = useNavigate();

    async function handleSubmit(){
        try {
            const user = await login({registration_number, password})
            console.log("Réponse de l'API:", user)
            setUser(user)
            
            if (user.authorization === "admin") {
                navigate("/admin");
            } else if (user.authorization === "operator") {
                navigate("/user");
            }
        } catch (error) {
            console.error("Erreur de la récupération des données: ", error)
        }
    }

    return(
       <>
       <div className="min-h-screen flex flex-col items-center bg-primary pt-6">
        <LoginForm 
            registration_number={registration_number}
            password={password}
            onRegistration_numberChange={setRegistration_number}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}/>
        </div>

       </>
    )
}