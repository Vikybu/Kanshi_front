export default async function getDowntimeReason(type : string){
    try {
        const response = await fetch( `http://localhost:8000/api/user/downtime-reason/${type}`,{
        method: "GET",
        headers: {"Content-Type": "application/json"}
        } 
    );
     if (!response.ok) {
    throw new Error("Erreur lors de la récupération de l'OF");
  }

    const data = await response.json();
    console.log(data)
    return data
    } catch(error){
        console.error(error)
    }
}