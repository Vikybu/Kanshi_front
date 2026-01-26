interface GetTRSPayload {
  real_start_time: string;
  actual_time: string;
  quantity_produced: number;
  machine_theoritical_industrial_pace: number;
}

export default async function getTRS(payload: GetTRSPayload) {
  // 🔹 Vérification des paramètres
  const { real_start_time, actual_time, quantity_produced, machine_theoritical_industrial_pace } = payload;

  if (!real_start_time || !actual_time) {
    throw new Error("Dates manquantes pour le calcul du TRS");
  }

  if (quantity_produced === undefined || quantity_produced === null) {
    throw new Error("Quantité produite manquante pour le calcul du TRS");
  }

  if (!machine_theoritical_industrial_pace || machine_theoritical_industrial_pace <= 0) {
    throw new Error("Cadence machine invalide pour le calcul du TRS");
  }

  console.log("Appel API TRS avec payload :", payload);

  try {
    const response = await fetch("http://localhost:8000/api/user/TRS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Réponse API TRS KO :", text);
      throw new Error(`Erreur lors de la récupération du TRS : ${response.status}`);
    }

    const data = await response.json();
    console.log("Réponse API TRS :", data);

    // Vérifier que le back renvoie bien { trs: number }
    if (data === undefined || data === null) {
      throw new Error("Le back ne renvoie pas de valeur TRS valide");
    }

    return data;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API TRS :", error);
    throw error;
  }
}
