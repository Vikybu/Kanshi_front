export default async function createProductionOrder(productionOrder: object){

    const response = await fetch ("http://localhost:8000/api/admin/productionOrder/create", {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(productionOrder)
    })
    if (!response.ok){
        throw new Error("Erreur lors de l'appel API");
    }

    const userData = await response.json()
    return userData.user
}