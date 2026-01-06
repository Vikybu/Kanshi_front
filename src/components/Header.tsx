import logoKanshi from "../assets/logoKanshi.png";

export default function Header() {
  return (
    <header className="bg-secondary p-4 flex items-center gap-4">
      <img 
          src={logoKanshi} 
          alt="Logo Kanshi" 
          className="w-24 h-24 object-contain" 
        />
        <p className="font-[--font-family-big-title] text-text text-xl">
          Bienvenue Victoria
        </p>
    </header>
  );
}
