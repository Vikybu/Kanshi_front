export default async function getOneProductionOrder(id: number){
    try {
        const response = await fetch( `http://localhost:8000/api/user/production/get/${id}`,{
        method: "GET",
        headers: {"Content-Type": "application/json"}
        } 
    );
     if (!response.ok) {
    throw new Error("Erreur lors de la récupération de l'OF");
  }

    const data = await response.json();
    return data
    } catch(error){
        console.error(error)
    }
}