import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import getOneProductionOrder from "../api/getOneProductionOrder";
import RadialChart from "../atoms/RadialChart";
import { TrsGauge } from "@/atoms/TrsGauge";
import HourCompo from "@/molecules/HourCompo";
import DowntimeReasonCompo from "../atoms/DowntimeReasonCompo";
import EndProductionCompo from "@/atoms/EndProductionCompo";

/* ===== Interfaces ===== */
interface Machine {
  id: number;
  machine_name: string;
  theoritical_industrial_pace: number;
}

interface RawMaterial {
  id: number;
  name: string;
  measurement_unit: string;
}

interface ProductionOrder {
  id: number;
  production_order_reference: string;
  real_start_time: string;
  theoritical_raw_material_quantity: number;
  actual_raw_material_quantity: number;
  start_time: string;
  end_time: string;
  theoritical_final_product_quantity: number;
  actual_final_product_quantity: number;
  status: string;
  machines: Machine[];
  raw_materials: RawMaterial[];
}

export default function ProductionPage() {
  const { id } = useParams<{ id: string }>();
  const [productionOrder, setProductionOrder] = useState<ProductionOrder | null>(null);
  const [timeData, setTimeData] = useState<{ start: string } | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [trs, setTrs] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const data = await getOneProductionOrder(Number(id));
      setProductionOrder(data);
    };

    fetchData();
  }, [id]);

  const machine = productionOrder?.machines?.[0];
  const machinePace = machine?.theoritical_industrial_pace || 0;

  useEffect(() => {
    calculateTrs();
  }, [timeData, quantity, productionOrder]);

  function diffMinutes(now: Date, start: Date) {
    return Math.abs(Math.round((now.getTime() - start.getTime()) / 1000 / 60));
  }

  function calculTRS(startTime: Date, nowTime: Date, productQuantity: number, paceMachine: number) {
    const duration = diffMinutes(nowTime, startTime);
    const theoretical_total_quantity = duration * paceMachine;
    return Math.round((productQuantity / theoretical_total_quantity) * 100);
  }

  const calculateTrs = () => {
    if (!timeData || quantity === null || !productionOrder || !machinePace) return;
    try {
      const trsValue = calculTRS(new Date(timeData.start), new Date(), quantity, machinePace);
      setTrs(trsValue);
    } catch (error) {
      console.error("Erreur calcul TRS", error);
    }
  };

  if (!productionOrder) return <p>Chargement…</p>;

  return (
    <div className="flex flex-col gap-3 min-h-screen bg-secondary">
      <HourCompo onTimeChange={setTimeData} />

      <div className="flex flex-row gap-4 flex-wrap px-1">
        <div className="flex-1 min-w-[200px]">
          <RadialChart onQuantityChange={setQuantity} />
        </div>

        <div className="flex-1 min-w-[200px]">
          <TrsGauge trs={trs} />
        </div>

        <div className="flex-[0.5] min-w-[120px] flex justify-center items-start">
          <EndProductionCompo productionId={productionOrder.id} />
        </div>
      </div>

      <div className="px-1">
        <DowntimeReasonCompo machine={productionOrder.machines[0]!} />
      </div>
    </div>
  );
}
