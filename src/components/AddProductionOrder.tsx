import createProductionOrder from "../api/createProductionOrder";
import ProductionOrderForm from "../molecules/ProductionOrderForm"
import { useState } from "react";

export default function ProductionOrder (){
    const [production_order_reference, setProduction_order_reference] = useState("");
    const [raw_material, setRaw_material] = useState("");
    const [theoritical_raw_material_quantity, setTheoritical_raw_material_quantity] = useState<number | null>(null);
    const [machine_name, setMachine_name] = useState("");
    const [start_time, setStart_time] = useState("");
    const [end_time, setEnd_time] = useState("");
    const [theoritical_final_product_quantity, setTheoritical_final_product_quantity] = useState<number | null>(null);
    const [final_product_name, setFinal_product_name] = useState("");

    async function addNewProductionOrder(e: React.FormEvent<HTMLFormElement>){
        interface ProductionOrder {
            production_order_reference: string;
            raw_material : string;
            theoritical_raw_material_quantity: number;
            machine_name: string;
            start_time: string;
            end_time: string;
            theoritical_final_product_quantity: number;
            final_product_name: string;
        }

        const formData = new FormData(e.currentTarget)
        const rawData = Object.fromEntries(formData.entries())

        const data : ProductionOrder = {
            production_order_reference: rawData.production_order_reference as string,
            raw_material: rawData.raw_material as string,
            theoritical_raw_material_quantity: Number(rawData.theoritical_raw_material_quantity),
            machine_name: rawData.machine_name as string,
            start_time: rawData.start_time as string,
            end_time: rawData.end_time as string,
            theoritical_final_product_quantity:  Number(rawData.theoritical_final_product_quantity),
            final_product_name: rawData.final_product_name as string,
        }

        console.log(data)
        const message = await createProductionOrder(data)
        console.log(message)

    }

    return (
        <div>
            <ProductionOrderForm
                production_order_reference={production_order_reference}
                raw_material={raw_material}
                theoritical_raw_material_quantity={theoritical_raw_material_quantity}
                machine_name={machine_name}
                start_time={start_time}
                end_time={end_time}
                theoritical_final_product_quantity={theoritical_final_product_quantity}
                final_product_name={final_product_name}

                onProduction_order_referenceChange={setProduction_order_reference}
                onRaw_materialChange={setRaw_material}
                onTheoritical_raw_material_quantityChange={setTheoritical_raw_material_quantity}
                onMachine_nameChange={setMachine_name}
                onStart_timeChange={setStart_time}
                onEnd_timeChange={setEnd_time}
                onTheoritical_final_product_quantityChange={setTheoritical_final_product_quantity}
                onFinal_product_nameChange={setFinal_product_name}
                onSubmit={addNewProductionOrder}


            />
        </div>
    )
}