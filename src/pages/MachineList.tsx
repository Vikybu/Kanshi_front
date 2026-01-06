import { useNavigate } from "react-router-dom";

export default function MachineList() {
  const navigate = useNavigate();

  return (
    <>
    <div className="flex flex-column justify-center bg-primary">
        <button className="bg-secondary text-text font-family-[ --font-family-text] px-6 py-2 rounded-lg hover:bg-secondary/90 transition duration-200" 
                onClick={() => navigate("/admin/machine/create")}>
                Ajouter une machine
        </button>

            {/* liste des machines */}
    </div>
      
    </>
  );
}