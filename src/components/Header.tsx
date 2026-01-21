import logoKanshi from "../assets/logoKanshi.png";
import {useUserStore} from "../stores/userStore";
import { useState, useEffect } from "react";

export default function Header() {
  const { user} = useUserStore()
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
  return () => clearInterval(timer); // cleanup
  }, []);

  return (
    
    <header className="bg-secondary p-4 flex justify-between items-center gap-4">
      <img 
          src={logoKanshi} 
          alt="Logo Kanshi" 
          className="w-20 h-20 object-contain" 
        />
      <p className="font-text text-text text-xl">
        Bienvenue {user?.firstname}
      </p>
      <p className="font-text text-text text-xl">{time.toLocaleTimeString()}</p>
    </header>
  );
}
