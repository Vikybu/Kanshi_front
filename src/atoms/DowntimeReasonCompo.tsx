import { useEffect, useState } from "react";
import Button from "./Button";
import getDowntimeReason from "../api/getDowntimeReason";
import createNewDowntimeMachine from "../api/createNewDowntimeMachine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


interface DowntimeReason {
  id: number;
  name: string;
}

interface Machine {
  id: number;
  machine_name: string;
  theoritical_industrial_pace: number;
}

interface DowntimeReasonCompoProps {
  machine: Machine;
}

interface CreateDowntimePayload {
  machine_id: number;
  downtime_reason_id: number;
  start_time_downtime: string;
  end_time_downtime: string;
}


export default function DowntimeReasonCompo({ machine }: DowntimeReasonCompoProps) {
  const [selectedType, setSelectedType] = useState<"planned" | "unplanned" | null>(null);
  const [downtimeReasons, setDowntimeReasons] = useState<DowntimeReason[]>([]);
  const [selectedReason, setSelectedReason] = useState<DowntimeReason | null>(null);
  const [loading, setLoading] = useState(false);

  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  useEffect(() => {
    if (!selectedType) return;

    const fetchDowntimeReasons = async () => {
      setLoading(true);
      try {
        const data = await getDowntimeReason(selectedType);
        setDowntimeReasons(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDowntimeReasons();
    setSelectedReason(null);
  }, [selectedType]);


  async function createNewDowntime() {
    if (!selectedReason || !startDateTime || !endDateTime) return;

    if (new Date(endDateTime) <= new Date(startDateTime)) {
      alert("La date de fin doit être après la date de début");
      return;
    }

    const payload: CreateDowntimePayload = {
      machine_id: machine.id,
      downtime_reason_id: selectedReason.id,
      start_time_downtime: startDateTime,
      end_time_downtime: endDateTime,
    };

    try {
      await createNewDowntimeMachine(payload);

      setSelectedReason(null);
      setStartDateTime("");
      setEndDateTime("");
    } catch (error: any) {
        if (error.response) {
            console.error("Erreur backend :", error.response.data);
        } else {
            console.error("Erreur inconnue :", error);
        }
        throw new Error("Erreur lors de l'appel API");
    }
  }


  return (
    <div className="flex gap-6 w-full">

      <Card className="w-80">
        <CardHeader className="items-center font-text">
          <CardTitle>Déclaration d'un arrêt</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center gap-3">
          <Button onClick={() => setSelectedType("planned")}>
            Arrêt planifié
          </Button>
          <Button onClick={() => setSelectedType("unplanned")}>
            Arrêt non planifié
          </Button>
        </CardContent>
      </Card>

      {selectedType && (
        <Card className="w-96">
          <CardHeader>
            <CardTitle>
              {selectedType === "planned"
                ? "Arrêts planifiés"
                : "Arrêts non planifiés"}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-wrap gap-2">
            {loading && <p className="w-full">Chargement...</p>}

            {!loading &&
              downtimeReasons.map((reason) => (
                <div
                  key={reason.id}
                  onClick={() => setSelectedReason(reason)}
                  className={`flex-1 min-w-[120px] p-2 rounded cursor-pointer text-center
                    ${
                      selectedReason?.id === reason.id
                        ? "bg-blue-500 text-white"
                        : "bg-muted hover:bg-muted/70"
                    }`}
                >
                  {reason.name}
                </div>
              ))}

            {!loading && downtimeReasons.length === 0 && (
              <p className="w-full text-sm text-muted-foreground">
                Aucun arrêt trouvé
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {selectedReason && (
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Saisir les horaires de l'arrêt</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-medium">Début</label>
              <input
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                className="border rounded p-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Fin</label>
              <input
                type="datetime-local"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                className="border rounded p-2"
              />
            </div>

            <Button
              onClick={createNewDowntime}
              disabled={!startDateTime || !endDateTime}
            >
              Enregistrer l'arrêt
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
