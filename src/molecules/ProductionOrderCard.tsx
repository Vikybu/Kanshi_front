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
    onButtonClick,}: ProductionOrderProps){ 

    return(
        <div className="bg-secondary rounded-xl shadow-md p-6 text-gray-800 gap-5">
            <p>{production_order_reference}</p>
            <p>{machine_name}</p>
            <p>{status}</p>
            <p>{name}</p>
            <p>{theoritical_raw_material_quantity}{measurement_unit}</p>
            <p>{start_time}</p>
            <p>{end_time}</p>
            <p>{theoritical_final_product_quantity} barquettes</p>
        <Button 
        showButton={showButton}  
        onClick={onButtonClick}
        > Démarrer l'ordre de fabrication</Button>
        </div>
    )
}

