import logoKanshi from "../assets/logoKanshi.png";
import Button from "../atoms/Button";
import { useUserStore } from "../stores/userStore";
import { useState, useEffect } from "react";

export default function Header() {
  const { user, logout } = useUserStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-secondary p-4 flex justify-between items-center gap-4">
      <img 
        src={logoKanshi} 
        alt="Logo Kanshi" 
        className="w-16 h-16 object-contain" 
      />

      {user && (
        <div className="flex flex-col justify-center gap-3">
          <p className="font-text text-2xl text-text">Bienvenue {user.firstname}</p>
          <Button type="button" onClick={logout}> 
            Se déconnecter
          </Button>
        </div>
      )}

      <p className="font-text text-text text-2xl">{time.toLocaleTimeString()}</p>
    </header>
  );
}
