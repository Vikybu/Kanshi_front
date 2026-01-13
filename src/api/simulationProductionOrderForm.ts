export default async function simulationProductionOrder(formData: object){
    try {
    const response = await fetch ("http://localhost:8000/api/admin/productionOrder/simuler", {
        method: 'POST',
        headers : {'Content-Type' : 'application/json',
            'Accept': 'application/json'
        },
        body : JSON.stringify(formData)
    })   

    const data = await response.json();
    console.log("Réponse du back :", data);
    return data; 
    } catch (error) {
        console.error("Erreur lors de la création de la machine :", error);
        throw error;
    }
}