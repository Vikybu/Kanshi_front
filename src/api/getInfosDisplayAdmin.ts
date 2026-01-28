export default async function getInfosDisplayAdmin(){
    try {
        const response = await fetch( `http://localhost:8000/api/admin/display-production`,{
        method: "GET",
        headers: {"Content-Type": "application/json"}
        } 
    );
     if (!response.ok) {
    throw new Error("Erreur lors de la récupération des informations");
  }

    const data = await response.json();
    console.log(data)
    return data
    } catch(error){
        console.error(error)
    }
}