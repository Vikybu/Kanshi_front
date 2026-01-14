export default async function createProductionOrder(payload: any) {
  console.log("Payload FINAL envoyé à l'API :", payload);

  const response = await fetch( "http://localhost:8000/api/admin/productionOrder/create",{
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