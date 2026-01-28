export default async function updateQuantityProduction(
  productionOrderId: number, 
  quantityToAdd: number
) {
  console.log("=== API updateQuantityProduction ===");
  console.log("URL:", `http://localhost:8000/api/user/fo/${productionOrderId}/update-quantity`);
  console.log("Body:", { quantity_to_add: quantityToAdd });

  try {
    const response = await fetch(`http://localhost:8000/api/user/fo/${productionOrderId}/update-quantity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        quantity_to_add: quantityToAdd
      })
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Erreur response:", errorData);
      throw new Error(errorData.message || "Erreur lors de la mise à jour");
    }

    const data = await response.json();
    console.log("✅ Réponse du back:", data);
    return data;
    
  } catch (error) {
    console.error("❌ Erreur catch:", error);
    throw error;
  }
}