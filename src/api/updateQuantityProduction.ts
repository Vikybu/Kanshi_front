export default async function updateQuantityProduction(id: number, actual_final_product_quantity: number){
    try {
    const response = await fetch ("http://localhost:8000/api/user/fo/modify-quantity", {
        method: 'PUT',
        headers : {'Content-Type' : 'application/json',
            'Accept': 'application/json'
        },
        body : JSON.stringify({id, actual_final_product_quantity })
    })   

     const data = await response.text();
    console.log("Réponse du back :", data);
    return data; 
  } catch (error) {
    console.error("Erreur lors de la modification de l'ordre de production  :", error);
    throw error;
  }
}
