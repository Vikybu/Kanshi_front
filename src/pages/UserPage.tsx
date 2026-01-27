import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { useProductionStore } from "../stores/useProductionStore";
import { useUserStore } from "../stores/userStore";
import ProductionOrderCard from "../molecules/ProductionOrderCard";
import getProductionOrderPlannified from "../api/getProductionOrderPlannified";
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
      const { user } = useUserStore();
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getProductionOrderPlannified()
            setProductionOrders(data)
        }
        fetchData()
    }, [])

    async function getDateAndHour(id: number) {
    if (!user) return;
    const status = "inProduction";
    const real_start_time = new Date().toISOString();

    await sendDate(real_start_time, id, status, user.id);
}

    async function goToTheProduction(id: number){
        const activeProductionId = useProductionStore.getState().activeProductionId;

        if (activeProductionId) {
            alert("Vous avez déjà un OF actif !");
            return; 
        }

    await getDateAndHour(id);
    useProductionStore.getState().setActiveProduction(id.toString());
    navigate(`/user/production/${id}`);
    }

      return (
        <div className="flex flex-col justify-center">
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