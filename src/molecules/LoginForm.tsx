import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

interface LoginFormProps {
  registration_number: string;
  password: string;
  onRegistration_numberChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;  
};

const loginForm = ({
    registration_number, 
    password, 
    onRegistration_numberChange, 
    onPasswordChange, 
    onSubmit,
    } : LoginFormProps) => {

    return (
      
        <form
          onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="bg-secondary rounded-xl p-3 w-full max-w-md flex flex-col space-y-3">
            <div ></div>
              <h1 className="text-2xl font-family-[--font-family-small-title] text-center text-text mb-4">Connexion à votre compte</h1>
              <Input type="text" identification="registration_number" value={registration_number} onChange={onRegistration_numberChange}>Numéro de matricule</Input>
              <Input type="password" identification="password" value={password} onChange={onPasswordChange}>Mot de passe</Input>
              <Button type="submit" >Se connecter</Button>
              <Button type="reset">Annuler</Button>
        </form>
        
    )
}

export default loginForm;
