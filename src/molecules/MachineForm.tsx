import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

interface MachineFormProps {
    machine_name: string;
    short_name: string;
    theoritical_industrial_pace: string;
    measurement_unit: string;
    product1: string;
    product2: string;
    product3: string;
    onProduct1Change: (value: string) => void;
    onProduct2Change: (value: string) => void;
    onProduct3Change: (value: string) => void;
    onMachine_nameChange: (value: string) => void;
    onShort_nameChange: (value: string) => void;
    onTheoritical_industrial_paceChange: (value: string) => void;
    onMeasurement_unitChange: (value: string) => void;
    onSubmit: (e : React.FormEvent<HTMLFormElement>) => void;  
};

const loginForm = ({
    machine_name, 
    short_name,
    theoritical_industrial_pace,
    measurement_unit,
    product1,
    product2,
    product3, 
    onProduct1Change,
    onProduct2Change,
    onProduct3Change,
    onMachine_nameChange,
    onShort_nameChange,
    onTheoritical_industrial_paceChange,
    onMeasurement_unitChange,
    onSubmit,
    } : MachineFormProps) => {
 
    return (
        <form
        onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      className="bg-secondary rounded-xl p-3 w-full max-w-md flex flex-col space-y-3"
      >
            <h1>Création d'une nouvelle machine </h1>
            <Input type="text" identification="machine_name" value={machine_name} onChange={onMachine_nameChange}>Nom de la machine</Input>
            <Input type="text" identification="short_name" value={short_name} onChange={onShort_nameChange}>Raccourci nom de la machine</Input>
            <Input type="text" identification="theoritical_industrial_pace" value={theoritical_industrial_pace} onChange={onTheoritical_industrial_paceChange}>Cadence théorique</Input>
            <Input type="text" identification="measurement_unit" value={measurement_unit} onChange={onMeasurement_unitChange}>Unité de mesure de la cadence théorique</Input>
            <Input type="text" identification="product1" value={product1} onChange={onProduct1Change}>Produit fabriqué :</Input>
            <Input type="text" identification="product2" value={product2} onChange={onProduct2Change}>Produit fabriqué</Input>
            <Input type="text" identification="product3" value={product3} onChange={onProduct3Change}>Produit fabriqué</Input>
            <Button type="submit">Ajouter la machine</Button>
            <Button type="reset">Annuler</Button>

        </form>
    )
}

export default loginForm;
