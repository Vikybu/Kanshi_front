export default async function createNewDowntimeMachine(payload: {
  machine_id: number;
  downtime_reason_id: number;
  started_at: string;
  ended_at: string;
}) {

  const response = await fetch( "http://localhost:8000/api/user/downtime-reason-machine/create",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error("Erreur backend :", error);
    throw new Error("Erreur lors de l'appel API");
  }

  const data = await response.json();
  return data;
}