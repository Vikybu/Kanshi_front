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
}


export default function ProductionOrderCard({measurement_unit, production_order_reference, machine_name, theoritical_raw_material_quantity, start_time, end_time,theoritical_final_product_quantity,status, name}: ProductionOrderProps){ 
    return(
        <div className="flex flex-row gap-4 text-secondary">
            <p>{production_order_reference}</p>
            <p>{status}</p>
            <p>{name}</p>
            <p>{theoritical_raw_material_quantity}{measurement_unit}</p>
            <p>{start_time}</p>
            <p>{end_time}</p>
            <p>{theoritical_final_product_quantity}</p>
            <p>{machine_name}</p>
            
        </div>
    )
}

