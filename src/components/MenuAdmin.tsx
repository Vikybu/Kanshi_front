import { Link } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

const Navbar = () => {
  const { user } = useUserStore();

  if (user?.authorization !== "admin") {
    return null;
  }

  return (
    <nav className="rounded bg-primary">
      <ul className="flex flex-row gap-5 p-3">
        <li className="text-secondary font-text"><Link to="/admin">Accueil</Link></li>
        <li className="text-secondary font-text"><Link to="/admin/machine">Machine</Link></li>
        <li className="text-secondary font-text"><Link to="/admin/of">Ordres de fabrication</Link></li>
      </ul>
      
    </nav>
  );
};

export default Navbar;