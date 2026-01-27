import { useEffect, useState } from "react";
import ProductionOrderCard from "../molecules/ProductionOrderCard";
import ProductionOrderForm from "../molecules/ProductionOrderForm";
import getProductionOrder from "../api/getProductionOrder";

interface Machine {
  id: number;
  machine_name: string;
}

interface RawMaterial {
  id: number;
  name: string;
  measurement_unit: string;
}

interface ProductionOrder {
  id: number;
  production_order_reference: string;
  theoritical_raw_material_quantity: number;
  start_time: string;
  end_time: string;
  theoritical_final_product_quantity: number;
  raw_materials: RawMaterial[];
  machines: Machine[];
  status: string;
}

export default function FabricationOrderPage() {
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductionOrder();
      setProductionOrders(data);
    };
    fetchData();
  }, []);

  // Récupérer uniquement le dernier OF
  const lastOF = productionOrders.length > 0 ? productionOrders[productionOrders.length - 1] : null;

  return (
    <div className="bg-primary rounded shadow-md flex flex-col items-center justify-between gap-2 pt-4 mt-3">
      <div className="flex flex-col justify-center items-center gap-2">
        {lastOF && (
          <ProductionOrderCard
            key={lastOF.id}
            id={lastOF.id}
            machine_name={lastOF.machines[0]?.machine_name ?? "—"}
            production_order_reference={lastOF.production_order_reference}
            theoritical_raw_material_quantity={lastOF.theoritical_raw_material_quantity}
            start_time={lastOF.start_time}
            theoritical_final_product_quantity={lastOF.theoritical_final_product_quantity}
            end_time={lastOF.end_time}
            name={lastOF.raw_materials?.[0]?.name ?? "—"}
            measurement_unit={lastOF.raw_materials?.[0]?.measurement_unit ?? "—"}
            status={lastOF.status}
            showButton={false}
            direction="row"
          />
        )}
      </div>

      <ProductionOrderForm />
    </div>
  );
}
