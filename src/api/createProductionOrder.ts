export default async function createNewDowntime(payload: {
  machine_id: number;
  downtime_reason_id: number;
  started_at: string;
  ended_at: string;
}) {
  const response = await fetch("/api/machine-downtimes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la création de l'arrêt");
  }

  return response.json();
}