import login from '../api/login.ts';
import { useFormStatus} from "react-dom";

export default function Login() {
    async function handleSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        try {
            const userData = await login(data)
            console.log("Réponse de l'API:", userData)
        } catch (error) {
            console.error("Erreur de la récupération des données: ", error)
        }
        
    }

    const { pending } = useFormStatus();

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