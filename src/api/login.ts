export default async function login(user: object){
    const response = await fetch ("http://localhost:8000/api/login", {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(user)
    })
    if (!response.ok){
        throw new Error("Erreur lors de l'appel API");
    }

    const userData = await response.json()
    console.log(userData)
    return userData.user
}