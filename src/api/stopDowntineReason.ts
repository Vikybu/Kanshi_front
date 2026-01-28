interface EndDowntimePayload {
  end_time_downtime: string;
}

export default async function sendEndProduction(
  downtimeId: number,
  payload: EndDowntimePayload
) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/user/downtimes/${downtimeId}/end`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur API: ${errorText}`);
    }

    const data = await response.json();
    console.log("Réponse du back :", data);
    return data;
  } catch (error) {
    console.error("Erreur lors de la fin de l'arrêt :", error);
    throw error;
  }
}
