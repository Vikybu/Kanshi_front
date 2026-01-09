import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MachineCard from "../molecules/MachineCard"
import machineList from "../api/machineList"

interface MachineDataProps {
  id: number;
  machine_name: string;
  short_name: string;
  theoritical_industrial_pace: string;
  measurement_unit: string;
}

export default function MachineList() {
  const navigate = useNavigate();
  const [machines, setMachines] = useState<MachineDataProps[]>([]);
  
  useEffect(() => {
    machineList().then(data => setMachines(data));
  }, []);

  return (
    <div className="flex flex-col justify-center bg-primary items-center gap-3 p-2">
      <button className="bg-secondary text-text font-text px-6 py-2 rounded-lg hover:bg-secondary/90 transition duration-200" 
              onClick={() => navigate("/admin/machine/create")}>
              Ajouter une machine
      </button>
      
      <h1 className="text-secondary font-big-title">Listes de machines</h1>
      <div className="flex flex-row gap-3">
        {machines.map(machine => (
          <MachineCard 
            key={machine.id}
            id={machine.id}
            machine_name={machine.machine_name}
            short_name={machine.short_name}
            theoritical_industrial_pace={machine.theoritical_industrial_pace}
            measurement_unit={machine.measurement_unit}
          />
        ))}
      </div>
      
    </div>

  );
}