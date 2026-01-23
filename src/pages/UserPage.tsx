import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { useProductionStore } from "../stores/useProductionStore";
import ProductionOrderCard from "../molecules/ProductionOrderCard";
import getProductionOrder from "../api/getProductionOrder";
import sendDate from "../api/sendDate";
import Header from "../components/Header";
import MenuUser from "../components/MenuUser";

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

    async function getDateAndHour(id: number) {
    const status = "inProduction";

    const now = new Date();
    const formattedNow = now.getFullYear() + '-' +
                         String(now.getMonth() + 1).padStart(2, '0') + '-' +
                         String(now.getDate()).padStart(2, '0') + ' ' +
                         String(now.getHours()).padStart(2, '0') + ':' +
                         String(now.getMinutes()).padStart(2, '0') + ':' +
                         String(now.getSeconds()).padStart(2, '0');

    await sendDate(formattedNow, id, status);
}

    async function goToTheProduction(id: number){
        await getDateAndHour(id);
        useProductionStore.getState().setActiveProduction(id.toString());
        navigate(`/user/production/${id}`);
    }

      return (
        <div className="flex flex-col justify-center py-10">
            <Header />
            <MenuUser />
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