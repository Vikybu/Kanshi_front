import { useParams } from "react-router-dom";
import getOneProductionOrder from "../api/getOneProductionOrder";
import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import sendDate from "../api/sendDate";
import { RadialChart } from "@/atoms/radialChart";
import { TrsGauge } from "@/atoms/TrsGauge";
import HourCompo from "@/molecules/HourCompo";

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
    actual_raw_material_quantity: number,
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
    const [showModalEndProduction, setShowModalEndProduction] = useState(false);
    const [showModalQuantity, setShowModalQuantity] = useState(false);

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

        function getDateAndHourEndProduction(id: number){
            const status = "endProduction"
            const now = new Date().toISOString().slice(0, 19).replace("T", " ");
            sendDate(now, id, status);
        }

        function getDateAndHourPause(id: number){
            const status = "onHold"
            const now = new Date().toISOString().slice(0, 19).replace("T", " ");
            sendDate(now, id, status);
        }

    return(
        <div className=" flex flex-col gap-7 min-h-screen bg-secondary">
            <HourCompo />
            <div className="flex flex-row">
                <div className="flex-1">
                    <RadialChart />
                </div>
                <div className="flex-1">
                    <TrsGauge trs={75} />
                </div>
            </div>

        </div> 
    )
}