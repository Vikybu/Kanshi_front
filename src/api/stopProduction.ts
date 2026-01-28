export default async function stopProduction(
  productionOrderId: number,
  finalQuantity: number
): Promise<void> {
  const response = await fetch(`/api/user/fo${productionOrderId}/stop`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      final_quantity: finalQuantity,
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'arrêt de la production");
  }
}