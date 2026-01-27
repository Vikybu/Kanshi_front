import { useNavigate } from "react-router-dom";
import sendEndProduction from "../api/sendEndProduction";
import { useUserStore } from "../stores/userStore";
import { useProductionStore  } from "../stores/useProductionStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EndProductionCompoProps {
  productionId: number;
}

export default function EndProductionCompo({ productionId }: EndProductionCompoProps) {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);
  const { user } = useUserStore();
   const clearActiveProduction = useProductionStore((state) => state.clearActiveProduction);

  const stopProduction = async () => {
    if (!user) {
      alert("Utilisateur non connecté");
      return;
  }
    try {
      const real_end_time = new Date().toISOString();
      await sendEndProduction(real_end_time, productionId, "finished", user.id);
      clearActiveProduction();

      navigate("/user/");
    } catch (error) {
      console.error("Erreur lors de l'arrêt de la production :", error);
      alert("Impossible d'arrêter la production. Vérifiez le serveur.");
    }
  };

  const goHome = () => navigate("/user/");

  return (
    <Card className="py-1">
      <CardHeader className="items-center font-text font-bold text-base">Actions Production</CardHeader>
      <CardContent className="flex flex-col justify-center gap-5">
        <button
        onClick={stopProduction}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-medium"
      >
        Arrêter la production
      </button>

      <button
        onClick={goHome}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
      >
        Accueil
      </button>

      <button
        onClick={logout}
        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md font-medium"
      >
        Logout
      </button>
      </CardContent>

      
    </Card>
  );
}
