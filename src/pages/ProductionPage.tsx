import { useParams } from "react-router-dom";
import getOneProductionOrder from "../api/getOneProductionOrder";
import { useEffect, useState } from "react";
import Button from "../atoms/Button";

interface Machine{
    id: number,
    machine_name: string
}

interface RawMaterial {
    id: number,
    name: string,
    measurement_unit: string
}

interface ProductionOrder {
    id: number,
    production_order_reference : string,
    real_start_time : string,
    theoritical_raw_material_quantity: number,
    actual_theoritical_raw_material_quantity: number,
    start_time: string, 
    end_time: string,
    theoritical_final_product_quantity: number,
    actual_final_product_quantity: number,
    status: string,
    machines: Machine[],
    raw_materials: RawMaterial[],
}

export default function ProductionPage(){
    const { id } = useParams<{ id: string }>();

    const [productionOrder, setProductionOrder] = useState<ProductionOrder | null>(null);

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            const data = await getOneProductionOrder(Number(id));
            console.log("🚀 ~ fetchData ~ data:", data)
            setProductionOrder(data);
        }
        fetchData()
        }, [])
    
    if (!productionOrder) {
        return <p>Aucune donnée trouvée</p>;
    }

    const startTime = new Date(productionOrder.real_start_time)
    
    function translateStatus(status: string){
        let status_fr = ""
        if(status === "inProduction"){
            status_fr = 'En production'
        } else if(status === "plannified"){
            status_fr = 'Plannifié'
        } else if(status === "stopped"){
            status_fr = "En arrêt"
        } else if(status === "onHold"){
            status_fr = "Pause"
        }
        return status_fr
    }

    return(
        <div className=" flex flex-col gap-7 min-h-screen bg-primary">
            <div className="flex flex-row justify-around">
                <p className="text-5xl font-text text-secondary">{productionOrder.production_order_reference}</p>
                <p className="text-4xl font-text text-secondary">{productionOrder.machines[0]?.machine_name ?? "—"}</p>
                <p className="text-4xl font-text text-secondary">{translateStatus(productionOrder.status)}</p>
            </div>
            <p className="text-2xl font-text text-secondary">{productionOrder.raw_materials[0]?.name ?? "—"} {productionOrder.theoritical_raw_material_quantity}{productionOrder.raw_materials[0]?.measurement_unit ?? "—"}</p>
            <p className="text-xl font-text text-secondary">Début de la production: {startTime.toLocaleString()}</p>
            <div className="flex flex-row justify-center gap-4">  
                <p className="text-4xl font-text text-secondary">{productionOrder.actual_final_product_quantity}</p>
                <p className="text-4xl font-text text-secondary">/</p>
                <p className="text-4xl font-text text-secondary">{productionOrder.theoritical_final_product_quantity}</p>   
            </div>
            <div className="flex flex-row justify-center">
                <Button>Ajouter une quantité produite</Button>
                <Button>Déclarer un arrêt</Button>
                <Button>Arrêter la production</Button>
            </div>
        </div> 
    )
}