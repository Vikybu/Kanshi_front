import MachineForm from '../molecules/MachineForm';
import addMachineOnBack from '../api/addMachine'
import { useState } from "react";

export default function AddMachine(){

    const [machine_name, setMachine_name] = useState("");
    const [short_name, setShort_name] = useState("");
    const [theoritical_industrial_pace, setTheoritical_industrial_pace] = useState("");
    const [measurement_unit, setMeasurement_unit] = useState("");
    const [product1, setProduct1] = useState("");
    const [product2, setProduct2] = useState("");
    const [product3, setProduct3] = useState("");

    async function createAMachine(e: React.FormEvent<HTMLFormElement>){
        interface Machine {
            machine_name: string;
            short_name: string;
            theoritical_industrial_pace: string;
            measurement_unit: string;
        }

        const formData = new FormData(e.currentTarget)
        const rawData = Object.fromEntries(formData.entries())

        const data: Machine = {
            machine_name : rawData.machine_name as string,
            short_name: rawData.short_name as string,
            theoritical_industrial_pace: rawData.theoritical_industrial_pace as string,
            measurement_unit: rawData.measurement_unit as string
        }
        console.log(data)
        const message = await addMachineOnBack(data)
        console.log(message)
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-primary pt-6">
            <MachineForm
                machine_name={machine_name}
                short_name={short_name}
                theoritical_industrial_pace={theoritical_industrial_pace}
                measurement_unit={measurement_unit}
                product1={product1}
                product2={product2}
                product3={product3}
                onProduct1Change={setProduct1}
                onProduct2Change={setProduct2}
                onProduct3Change={setProduct3}
                onMachine_nameChange={setMachine_name}
                onShort_nameChange={setShort_name}
                onTheoritical_industrial_paceChange={setTheoritical_industrial_pace}
                onMeasurement_unitChange={setMeasurement_unit}
                onSubmit={createAMachine}
            />
        </div>
    )
}