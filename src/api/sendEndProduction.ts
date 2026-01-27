export default async function sendEndProduction(real_end_time: string, id: number, status: string, user_id: number) {
  try {
    const response = await fetch("http://localhost:8000/api/user/fo/stop", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ real_end_time, id, status, user_id })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur API: ${errorText}`);
    }

    const data = await response.json();
    console.log("Réponse du back :", data);
    return data;

  } catch (error) {
    console.error("Erreur lors de la modification de l'ordre de production :", error);
    throw error;
  }
}
