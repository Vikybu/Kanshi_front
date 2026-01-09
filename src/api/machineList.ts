export interface RawMaterial {
  id: number;
  name: string;
  type: string;
  reference: string;
}

export default async function getRawMaterials(): Promise<RawMaterial[]> {
  try {
    const BASE_URL = "http://localhost:8000/api";
    const response = await fetch(`${BASE_URL}/raw-materials`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des matières premières");
    }

    const data: RawMaterial[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des matières premières :", error);
    throw error;
  }
}