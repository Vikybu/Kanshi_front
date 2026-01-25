import { Link } from "react-router-dom";

const NoProduction = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold text-primary mb-4">
        Aucune production en cours
      </h1>
      <p className="text-gray-600 mb-6">
        Vous n'avez pas de production active pour le moment.
      </p>
      <Link 
        to="/user" 
        className="bg-primary text-secondary px-6 py-2 rounded hover:opacity-90"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NoProduction;