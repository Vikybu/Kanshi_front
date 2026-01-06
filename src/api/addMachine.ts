export default async function addMachineOnBack(formData: object){
    try {
    const response = await fetch ("http://localhost:8000/api/machine/create", {
        method: 'POST',
        headers : {'Content-type' : 'application/json',
            'Accept': 'application/json'
        },
        body : JSON.stringify(formData)
    })   

    const data = await response.json()
    console.log('Réponse du back :', data);
    } catch (error) {
        console.error('Erreur lors de la création de la machine :', error);
    }
}