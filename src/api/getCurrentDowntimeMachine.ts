export default async function getCurrentDowntimeMachine(machineId: number) {
  const response = await fetch(`http://localhost:8000/api/user/downtime-reason-machine/current/${machineId}`);

  if (!response.ok) {
    throw new Error("Erreur récupération arrêt en cours");
  }

  return await response.json();
}