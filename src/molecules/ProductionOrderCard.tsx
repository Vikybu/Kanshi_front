import Button from "../atoms/Button"

interface ProductionOrderProps {
    id: number,
    production_order_reference: string,
    machine_name: string,
    theoritical_raw_material_quantity: number,
    start_time: string,
    end_time: string,
    theoritical_final_product_quantity: number,
    status: string,
    name: string,
    measurement_unit: string

    showButton?: boolean;
    onButtonClick?: () => void;

    direction?: "row" | "col";
    gap?: string;
}


export default function ProductionOrderCard({measurement_unit, 
    production_order_reference, 
    machine_name, 
    theoritical_raw_material_quantity, 
    start_time, 
    end_time,theoritical_final_product_quantity,
    status, 
    name, 
    showButton = true,
    onButtonClick,
    direction = "col",
    gap = "gap-5",}: ProductionOrderProps){ 

    return(
        <div className={`
        bg-secondary rounded-xl shadow-md p-2 text-gray-800
        flex ${gap}
        ${direction === "row" ? "flex-row items-center" : "flex-col"}
      `}
      >
            <p className="font-text">{production_order_reference}</p>
            <p className="font-text">{machine_name}</p>
            <p className="font-text">{status}</p>
            <p className="font-text">{name}</p>
            <p className="font-text">{theoritical_raw_material_quantity}{measurement_unit}</p>
            <p className="font-text">{start_time}</p>
            <p className="font-text">{end_time}</p>
            <p className="font-text">{theoritical_final_product_quantity} barquettes</p>
        <Button 
        showButton={showButton}  
        onClick={onButtonClick}
        > Démarrer l'ordre de fabrication</Button>
        </div>
    )
}

