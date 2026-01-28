import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useProductionStore } from "../stores/useProductionStore";
import activeProduction from "../api/activeProduction";

const MenuUser = () => {
  const { user } = useUserStore();
  const { activeProductionId } = useProductionStore();
  const navigate = useNavigate();

  if (user?.authorization !== "operator") {
    return null;
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (activeProductionId) {
      navigate(`/user/production/${activeProductionId}`);
    } else {
      await activeProduction(navigate);
    }
  };

  return (
    <nav className="rounded bg-primary">
      <ul className="flex flex-row justify-around gap-5 p-3 m-3">
        <li className="text-secondary font-text text-xl">
          <Link to="/user">Accueil</Link>
        </li>
        <li className="text-secondary font-text text-xl">
          <button 
            type="button" 
            onClick={handleClick} 
            className="bg-transparent border-none p-0 cursor-pointer"
          >
            Production en cours
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MenuUser;