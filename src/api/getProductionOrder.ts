export default async function getProductionOrder(){
    try {
        const response = await fetch( "http://localhost:8000/api/admin/productionOrder/get",{
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