import { useEffect, useState } from "react";
import ProductionOrderCard from "../molecules/ProductionOrderCard"
import ProductionOrderForm  from "../molecules/ProductionOrderForm"
import getProductionOrder from "../api/getProductionOrder";

interface Machine {
    id: number
    machine_name: string
}

interface RawMaterial {
    id: number
    name: string
    measurement_unit: string
}

interface ProductionOrder {
    id: number,
    production_order_reference: string,
    theoritical_raw_material_quantity: number,
    start_time: string,
    end_time: string,
    theoritical_final_product_quantity: number,
    raw_materials: RawMaterial[],
    machines: Machine[],
    status: string
}

export default function FabricationOrderPage (){

    const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([])

    useEffect(() => {
        const fetchData = async () => {
        const data = await getProductionOrder()
        setProductionOrders(data)
        }
        fetchData()
    }, [])

    return (
        <div className="flex flex-col gap-3 bg-primary min-h-screen p-4 ">
            <div className="flex flex-col justify-center align-items gap-3">
                {productionOrders.map(productionOrder => (
                <ProductionOrderCard 
                key={productionOrder.id}
                id={productionOrder.id}
                machine_name={productionOrder.machines[0]?.machine_name ?? "—"}
                production_order_reference={productionOrder.production_order_reference}
                theoritical_raw_material_quantity={productionOrder.theoritical_raw_material_quantity}
                start_time={productionOrder.start_time}
                theoritical_final_product_quantity={productionOrder.theoritical_final_product_quantity}
                end_time={productionOrder.end_time}
                name={productionOrder.raw_materials?.[0]?.name ?? "—"}
                measurement_unit={productionOrder.raw_materials?.[0]?.measurement_unit ?? "—"}
                status={productionOrder.status}
                />
                ))}
                
            </div>
            <ProductionOrderForm  />
        </div>
    )
}