interface MachineDataProps {
    id: Number;
    machine_name: String;
    short_name: String;
    theoritical_industrial_pace: string;
    measurement_unit: string;
}

export default function MachineCard({machine_name, short_name, theoritical_industrial_pace, measurement_unit}: MachineDataProps){
    return (
        <div className="flex flex-col justify-start bg-secondary rounded p-2 ">
            <h1 className="text-text font-big-title">{machine_name}</h1>
            <h2 className="text-text font-text">{short_name}</h2>
            <p className="text-text font-text">Cadence : {theoritical_industrial_pace} {measurement_unit}</p>
        </div>
    )
}