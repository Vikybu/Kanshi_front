export default async function getProductionOrderPlannified(){
    try {
        const response = await fetch( "http://localhost:8000/api/admin/productionOrder/get/plannified",{
        method: "GET",
        headers: {"Content-Type": "application/json"}
        } 
    );
    const ProductionOrderData = await response.json()
    console.log(ProductionOrderData)
    return ProductionOrderData

    } catch(error){
        console.error(error)
    }
}