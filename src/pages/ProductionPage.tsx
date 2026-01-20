import { useParams } from "react-router-dom";

export default function ProductionPage(){
    const { id } = useParams<{ id: string }>();
    console.log("Production ID:", id);
    

    return(
        <div className="min-h-screen bg-primary">
        </div> 
    )
}