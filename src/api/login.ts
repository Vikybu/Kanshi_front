export default async function login(userIdentification: object){

    const response = await fetch ("http://localhost:8000/api/login", {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(userIdentification)
    })
    if (!response.ok){
        throw new Error("Erreur lors de l'appel API");
    }

    const userData = await response.json()
    return userData.user
}