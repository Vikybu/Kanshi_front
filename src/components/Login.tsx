import login from '../api/login.ts';
import { useFormStatus} from "react-dom";
import {useUserStore} from "../stores/userStore";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const { setUser} = useUserStore()
    const navigate = useNavigate();
    const { pending } = useFormStatus();

    async function handleSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        try {
            const user = await login(data)
            console.log("Réponse de l'API:", user)
            setUser(user)
            
            if (user.authorization === "Admin") {
                navigate("/admin");
            } else if (user.authorization === "User") {
                navigate("/user");
            }
        } catch (error) {
            console.error("Erreur de la récupération des données: ", error)
        }
    }

    return(
       <>
       <form onSubmit={handleSubmit}>
            <label >Numéro de matricule :
                <input type="text" name="registration_number" id="registration_number" />
            </label>
            <hr />
            <label>Mot de passe :
                <input type="password" name="password" id="password" />
            </label>
            <button type="submit" disabled={pending} 
            >{pending ? "Envoi en cours..." : "Valider"}</button>
            <button type="reset">Annuler</button>
        </form>
       </>
       
    )
}