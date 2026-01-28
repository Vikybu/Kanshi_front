import { useState } from "react";
import updateQuantityProduction from "../api/updateQuantityProduction";
import stopProduction from "../api/stopProduction"; // Nouvelle API
import Button from "@/atoms/Button";
import Input from "../atoms/Input";

interface AddQuantityProps {
  productionOrderId: number;
  onQuantityUpdated?: () => void;
  mode?: "add" | "stop"; // Nouveau: pour différencier ajout vs arrêt
  currentQuantity?: number; // Pour pré-remplir lors de l'arrêt
}

export default function AddQuantity({ 
  productionOrderId, 
  onQuantityUpdated,
  mode = "add",
  currentQuantity = 0
}: AddQuantityProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [quantityToAdd, setQuantityToAdd] = useState<number>(mode === "stop" ? currentQuantity : 0);

  // Clavier numérique : ajoute un chiffre à la fin
  const writeQuantity = (digit: number) => {
    setQuantityToAdd(prev => {
      const prevStr = prev.toString();
      const newStr = prev === 0 ? `${digit}` : prevStr + digit.toString();
      return Number(newStr);
    });
  };

  // Réinitialiser la valeur
  const clear = () => setQuantityToAdd(mode === "stop" ? currentQuantity : 0);

  // Ajouter une valeur rapide (+5, +10, ...)
  const addQuick = (value: number) => {
    setQuantityToAdd(prev => prev + value);
  };

  // Valider la quantité et envoyer au backend
  const validateQuantity = async () => {
    if (!productionOrderId || quantityToAdd < 0) return;

    try {
      if (mode === "stop") {
        // Arrêt de production : envoie la quantité finale
        await stopProduction(productionOrderId, quantityToAdd);
      } else {
        // Ajout de quantité : met à jour quantity_in_production
        await updateQuantityProduction(productionOrderId, quantityToAdd);
      }
      
      setQuantityToAdd(0);
      setIsOpen(false);

      if (onQuantityUpdated) onQuantityUpdated();
    } catch (error) {
      console.error("Erreur lors de l'envoi de la quantité :", error);
    }
  };

  const title = mode === "stop" ? "Arrêter la production" : "Ajouter une quantité";
  const validateText = mode === "stop" ? "Arrêter" : "Valider";
  const validateColor = mode === "stop" ? "bg-redColor" : "bg-greenColor";

  return (
    <div className="flex flex-col gap-3">
      {/* Input principal + Clear */}
      <div className="flex gap-2">
        <Input
          type="number"
          identification="quantity"
          value={quantityToAdd}
          onChange={(value) => setQuantityToAdd(Number(value))}
          className="w-28"
        />
        <Button onClick={clear} className="flex-shrink-0 bg-redColor">Clear</Button>
      </div>

      {/* Boutons rapides (uniquement en mode ajout) */}
      {mode === "add" && (
        <div className="grid grid-cols-3 gap-2">
          <Button onClick={() => addQuick(5)} className="bg-tertiaire px-4 py-2">+5</Button>
          <Button onClick={() => addQuick(10)} className="bg-tertiaire px-4 py-2">+10</Button>
          <Button onClick={() => addQuick(100)} className="bg-tertiaire px-4 py-2">+100</Button>
        </div>
      )}

      {/* Ouvrir clavier numérique */}
      <div className="flex gap-2">
        <Button onClick={() => setIsOpen(true)} variant="outline" className="flex-1">Clavier numérique</Button>
        <Button onClick={validateQuantity} className={`flex-1 ${validateColor}`}>{validateText}</Button>
      </div>

      {/* Clavier numérique modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>

            <div className="flex flex-col gap-3">
              {/* Input + Clear */}
              <div className="grid grid-cols-2 gap-2">
                <Input
                  className="col-span-2 text-center w-full"
                  type="number"
                  identification="quantity"
                  value={quantityToAdd ?? 0}
                  onChange={(value) => setQuantityToAdd(Number(value))}
                />
                <Button className="w-full bg-redColor" onClick={clear}>Clear</Button>
              </div>

              {/* Clavier numérique 1-9 */}
              <div className="grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6,7,8,9].map(n => (
                  <Button key={n} onClick={() => writeQuantity(n)}>{n}</Button>
                ))}
              </div>

              {/* Bouton 0 centré */}
              <div className="flex justify-center">
                <Button className="w-[33.333%]" onClick={() => writeQuantity(0)}>0</Button>
              </div>

              {/* Fermer + Valider */}
              <div className="flex gap-2 mt-4">
                <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={() => setIsOpen(false)}>Fermer</Button>
                <Button className={`flex-1 ${validateColor}`} onClick={validateQuantity}>{validateText}</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}