export default async function getFInalProduct() {
  try {
    const response = await fetch("http://localhost:8000/api/admin/final_product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des produits finaux");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Erreur lors des produits finaux :", error);
    throw error;
  }
}