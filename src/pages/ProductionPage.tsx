import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import getOneProductionOrder from "../api/getOneProductionOrder";
//import getTRS from "../api/getTRS";

import RadialChart from "../atoms/RadialChart";
import { TrsGauge } from "@/atoms/TrsGauge";
import HourCompo from "@/molecules/HourCompo";

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

/* ===== Component ===== */

export default function ProductionPage() {
  const { id } = useParams<{ id: string }>();

  const [productionOrder, setProductionOrder] = useState<ProductionOrder | null>(null);

  const [timeData, setTimeData] = useState<{start: string;} | null>(null);

  const [quantity, setQuantity] = useState<any | null>(null);
  const [trs, setTrs] = useState<number | null>(null);

  /* ===== Fetch Production Order ===== */

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const data = await getOneProductionOrder(Number(id));
      setProductionOrder(data);
    };

    fetchData();
  }, [id]);

  /* ===== Calcul TRS ===== */

  /* useEffect(() => {
    fetchTRS();
  }, [timeData, quantity, productionOrder]);

  const fetchTRS = async () => {
    if (!timeData || quantity === null || !productionOrder) return;

    
    if (!machinePace) {
      console.warn("Cadence machine introuvable");
      return;
    }

    try {
      const response = await getTRS({
        real_start_time: timeData.start,
        actual_time: timeData.end,
        quantity_produced: quantity,
        machine_theoritical_industrial_pace: machinePace,
      });
      console.log(typeof(response))
      setTrs(response.trs);
    } catch (error) {
      console.error("Erreur calcul TRS", error);
    }
  }; */


  let machinePace = 0;

  if (productionOrder != null) { 
     machinePace  = productionOrder.machines[0]?.theoritical_industrial_pace;
  }

  useEffect(() => { calculateTrs(); }, [timeData, quantity, productionOrder]);

  function calculTRS(startTime: Date,nowTime: Date, productQuantity: number, paceMachine: number){
    let duration = diff(nowTime, startTime)
    let theoretical_total_quantity = (duration * paceMachine);
    let TRS = Math.round((productQuantity / theoretical_total_quantity)*100);
    return TRS
  }

  const calculateTrs = async () => {
    if (!timeData || quantity === null || !productionOrder) return;

    if (!machinePace) {
      console.warn("Cadence machine introuvable");
      return;
    }

    try {
      let superTRSdeOUF = calculTRS(new Date(timeData.start), new Date(), quantity, machinePace)
      setTrs(superTRSdeOUF);
      console.log(superTRSdeOUF)
    } catch (error) {
      console.error("Erreur calcul TRS", error);
    }
  };

function diff(now: Date, start: Date){
    let diff =(now.getTime() - start.getTime()) / 1000;
  // Convert the difference from seconds to minutes
  diff /= 60;
  // Return the absolute value of the rounded difference in minutes
  return Math.abs(Math.round(diff));
}

  /* ===== Render ===== */

  if (!productionOrder) {
    return <p>Chargement…</p>;
  }

  return (
    <div className="flex flex-col gap-7 min-h-screen bg-secondary">
      {/* Temps */}
      <HourCompo onTimeChange={setTimeData} />

      <div className="flex flex-row">
        {/* Quantité */}
        <div className="flex-1">
          <RadialChart onQuantityChange={setQuantity} />
        </div>

        {/* TRS */}
        <div className="flex-1">
          <TrsGauge trs={trs} />
        </div>
      </div>
    </div>
  );
}
