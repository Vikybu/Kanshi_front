import { useNavigate } from "react-router-dom";
import sendDate from "../api/sendDate"; // ta fonction pour mettre à jour end_time

interface EndProductionCompoProps {
  productionId: number;
}

export default function EndProductionCompo({ productionId }: EndProductionCompoProps) {
  const navigate = useNavigate();

  const stopProduction = async () => {
    try {
      // On envoie la date actuelle comme end_time et status "finished"
      const endTime = new Date().toISOString();
      await sendDate(endTime, productionId, "finished");

      // Redirection vers l'accueil
      navigate("/user/");
    } catch (error) {
      console.error("Erreur lors de l'arrêt de la production :", error);
      alert("Impossible d'arrêter la production. Vérifiez le serveur.");
    }
  };

  const goHome = () => navigate("/user/");
  const logout = () => {
    // Ici tu peux nettoyer le localStorage ou token si besoin
    localStorage.removeItem("authToken");
    navigate("/user/");
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-center">Actions Production</h2>

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
    </div>
  );
}
