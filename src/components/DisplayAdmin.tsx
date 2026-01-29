import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getInfosDisplayAdmin from "@/api/getInfosDisplayAdmin";

interface Machine {
  id: number;
  machine_name: string;
  status: "inProduction" | "stopped" | "idle";
  current_of?: {
    id: number;
    production_order_reference: string;
    actual_final_product_quantity: number;
    theoritical_final_product_quantity: number;
  } | null;
  current_qty?: number;
  qty_to_produce?: number;
}

// Fonction utilitaire pour traduire le statut
const getStatusLabel = (status: Machine["status"]) => {
  const statusMap = {
    stopped: "Arrêt",
    idle: "Pas en production",
    inProduction: "En production",
  };
  return statusMap[status];
};

export default function DisplayAdmin() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(false);

  // Récupération des machines depuis le backend
  useEffect(() => {
    async function fetchMachines() {
      setLoading(true);
      try {
        setMachines(await getInfosDisplayAdmin());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchMachines();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 font-family-small-title">Vue globale production</h1>

      {loading ? (
        <p className="font-family-small-title">Chargement des machines...</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {machines.map((machine) => (
            <Card key={machine.id} className="w-80">
              <CardHeader>
                <CardTitle className="font-family-small-title">{machine.machine_name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <p className="font-family-small-title">
                  <strong>Statut : </strong>
                  <span
                    className={`font-bold font-family-small-title ${
                      machine.status === "inProduction"
                        ? "text-green-600"
                        : machine.status === "stopped"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {getStatusLabel(machine.status)}
                  </span>
                </p>

                {machine.current_of && (
                  <p>
                    <strong>OF : </strong>
                    {machine.current_of.production_order_reference}
                  </p>
                )}

                {machine.current_qty !== undefined && machine.qty_to_produce !== undefined && (
                  <p className="font-family-small-title">
                    <strong>Quantité : </strong>
                    {machine.current_qty} / {machine.qty_to_produce}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}