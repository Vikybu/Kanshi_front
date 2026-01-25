export default async function sendDate(realStartTime: string, id: number, status: string){
    try {
    const response = await fetch ("http://localhost:8000/api/user/fo/modify", {
        method: 'PUT',
        headers : {'Content-Type' : 'application/json',
            'Accept': 'application/json'
        },
        body : JSON.stringify({ real_start_time: realStartTime, id, status })
    })   

     const data = await response.text();
    console.log("Réponse du back :", data);
    return data; 
  } catch (error) {
    console.error("Erreur lors de la modification de l'ordre de production  :", error);
    throw error;
  }
}
