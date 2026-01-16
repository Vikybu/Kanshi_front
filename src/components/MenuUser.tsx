import { Link } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

const Navbar = () => {
  const { user } = useUserStore();

  if (user?.authorization !== "operator") {
    return null;
  }

  return (
    <nav className="rounded bg-primary">
      <ul className="flex flex-row gap-5 p-3 m-3">
        <li className="text-secondary font-text"><Link to="/user">Accueil</Link></li>
        <li className="text-secondary font-text"><Link to="/user/production">Production en cours</Link></li>
      </ul>
      
    </nav>
  );
};

export default Navbar;