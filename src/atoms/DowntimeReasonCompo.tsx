import { useEffect, useState } from "react";
import Button from "./Button";
import getDowntimeReason from "../api/getDowntimeReason";
import createNewDowntimeMachine from "../api/createNewDowntimeMachine";
import stopDowntimeReason from "../api/stopDowntineReason";
import getCurrentDowntimeMachine from "../api/getCurrentDowntimeMachine";
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

export default function DowntimeReasonCompo({ machine }: DowntimeReasonCompoProps) {
  const [selectedType, setSelectedType] = useState<"planned" | "unplanned" | null>(null);
  const [downtimeReasons, setDowntimeReasons] = useState<DowntimeReason[]>([]);
  const [selectedReason, setSelectedReason] = useState<DowntimeReason | null>(null);
  const [currentDowntimeReason, setCurrentDowntimeReason] = useState<DowntimeReason | null>(null);
  const [loading, setLoading] = useState(false);

  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [currentDowntimeId, setCurrentDowntimeId] = useState<number | null>(null);
  const [isStopping, setIsStopping] = useState(false);

  // Charger les raisons d’arrêt
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

  // Vérification si machine a un arrêt en cours
  useEffect(() => {
    const fetchCurrentDowntime = async () => {
      try {
        const downtime = await getCurrentDowntimeMachine(machine.id);

        if (downtime) {
          setCurrentDowntimeId(downtime.id);
          setCurrentDowntimeReason(downtime.downtimeReason); // cause actuelle
          setStartDateTime(downtime.start_time_downtime);
          setEndDateTime(downtime.end_time_downtime ?? "");
        }
      } catch (e) {
        console.error("Erreur récupération arrêt en cours", e);
      }
    };

    fetchCurrentDowntime();
  }, [machine.id]);

  // Démarrer un arrêt
  async function startDowntime(inProgress: boolean) {
    if (!selectedReason || !startDateTime) return;

    const payload: {
      machine_id: number;
      downtime_reason_id: number;
      start_time_downtime: string;
      end_time_downtime?: string | null;
    } = {
      machine_id: machine.id,
      downtime_reason_id: selectedReason.id,
      start_time_downtime: startDateTime,
    };

    if (!inProgress && endDateTime) {
      payload.end_time_downtime = endDateTime;
    }

    try {
      const newDowntime = await createNewDowntimeMachine(payload);
      console.log("Nouvel arrêt créé :", newDowntime);

      if (inProgress) {
        setCurrentDowntimeId(newDowntime.id);
        setCurrentDowntimeReason(selectedReason); // On stocke la cause
        setSelectedReason(null);
      } else {
        setSelectedReason(null);
        setStartDateTime("");
        setEndDateTime("");
        setSelectedType(null);
      }
    } catch (error) {
      console.error("Erreur lors du démarrage de l'arrêt", error);
    }
  }

  // Terminer un arrêt en cours
  async function stopDowntime() {
    if (!currentDowntimeId || !endDateTime) return;

    setIsStopping(true);
    try {
      await stopDowntimeReason(currentDowntimeId, { end_time_downtime: endDateTime });

      // Reset UI
      setCurrentDowntimeId(null);
      setCurrentDowntimeReason(null);
      setSelectedReason(null);
      setStartDateTime("");
      setEndDateTime("");
      setSelectedType(null);
    } catch (error) {
      console.error("Erreur lors de la fin de l'arrêt", error);
    } finally {
      setIsStopping(false);
    }
  }

  return (
    <div className="flex gap-6 w-full">

      {/* Choix type arrêt */}
      <Card className="w-80">
        <CardHeader className="items-center font-bold">
          <CardTitle className="items-center font-text font-bold text-base">Déclaration d'un arrêt</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center gap-3 ">
          <Button onClick={() => setSelectedType("planned")}>Planifié</Button>
          <Button onClick={() => setSelectedType("unplanned")}>Non planifié</Button>
        </CardContent>
      </Card>

      {/* Sélection des raisons d’arrêt */}
      {selectedType && !currentDowntimeId && (
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center font-text font-bold text-base">
              {selectedType === "planned" ? "planifiés" : "non planifiés"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {loading && <p className="w-full">Chargement...</p>}
            {!loading &&
              downtimeReasons.map((reason) => (
                <div
                  key={reason.id}
                  onClick={() => setSelectedReason(reason)}
                  className={`flex flex-1 min-w-30 p-2 rounded cursor-pointer 
                              items-center justify-center text-center 
                              font-family-small-title text-sm ${
                    selectedReason?.id === reason.id
                      ? "bg-primary text-white"
                      : "bg-muted hover:bg-muted/70"
                  }`}
                >
                  {reason.name}
                </div>
              ))}
            {!loading && downtimeReasons.length === 0 && (
              <p className="w-full text-sm text-muted-foreground font-family-small-title">Aucune raison trouvée</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Démarrer l’arrêt */}
      {selectedReason && !currentDowntimeId && (
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-center font-text font-bold text-base">Saisir les horaires de l'arrêt</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-family-small-title">Début</label>
              <input
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                className="border rounded p-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-family-small-title">Fin (optionnel si arrêt en cours)</label>
              <input
                type="datetime-local"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                className="border rounded p-2"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={() => startDowntime(true)} disabled={!startDateTime}>
                Démarrer l'arrêt en cours
              </Button>
              <Button onClick={() => startDowntime(false)} disabled={!startDateTime || !endDateTime}>
                Déclarer un arrêt terminé
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Arrêt en cours */}
      {currentDowntimeId && (
        <Card className="flex-1 border-red-500">
          <CardHeader className="flex flex-col gap-1">
            <CardTitle className="text-red-600 flex justify-between items-center">
              Arrêt en cours
              {currentDowntimeReason && (
                <span className="text-sm text-red-400 font-family-small-title">
                  Cause : {currentDowntimeReason.name}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-medium">Fin de l'arrêt</label>
              <input
                type="datetime-local"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                className="border rounded p-2"
              />
            </div>
            <Button onClick={stopDowntime} disabled={isStopping || !endDateTime}>
              {isStopping ? "Arrêt en cours..." : "Terminer l'arrêt"}
            </Button>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
