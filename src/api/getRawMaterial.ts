export default async function getRawMaterial() {
  try {
    const response = await fetch("http://localhost:8000/api/admin/machine", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des machines");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des machines :", error);
    throw error;
  }
}