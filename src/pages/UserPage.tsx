import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useProductionStore } from "../stores/useProductionStore";
import Header from "../components/Header";
import MenuUser from "../components/MenuUser";
import ProductionOrderCard from "../molecules/ProductionOrderCard";
import getProductionOrder from "../api/getProductionOrder";
import sendDate from "../api/sendDate";

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


export default function UserPage(){
    const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([])
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getProductionOrder()
            setProductionOrders(data)
        }
        fetchData()
    }, [])

    function getDateAndHour(id: number){
        const status = "inProduction"
        const now = new Date().toISOString().slice(0, 19).replace("T", " ");
        sendDate(now, id, status);
    }

    function goToTheProduction(id: number){
        getDateAndHour(id)
        useProductionStore.getState().setActiveProduction(id.toString());
        navigate(`/user/production/${id}`);
    }

      return (
        <div className="flex justify-center py-10">
            <div className="w-full max-w-6xl flex flex-row gap-4">
                {productionOrders.map((productionOrder) => (
                    <ProductionOrderCard
                        key={productionOrder.id}
                        id={productionOrder.id}
                        machine_name={productionOrder.machines[0]?.machine_name ?? "—"}
                        production_order_reference={productionOrder.production_order_reference}
                        theoritical_raw_material_quantity={productionOrder.theoritical_raw_material_quantity}
                        start_time={productionOrder.start_time}
                        end_time={productionOrder.end_time}
                        theoritical_final_product_quantity={productionOrder.theoritical_final_product_quantity}
                        name={productionOrder.raw_materials?.[0]?.name ?? "—"}
                        measurement_unit={productionOrder.raw_materials?.[0]?.measurement_unit ?? "—"}
                        status={productionOrder.status}
                        onButtonClick={() => goToTheProduction(productionOrder.id)}
                    />
                ))}
            </div>
        </div>
    );
}