import { useState } from "react";
import updateQuantityProduction from "../api/updateQuantityProduction";
import Button from "@/atoms/Button";
import Input from "../atoms/Input";

interface AddQuantityProps {
  productionOrderId: number;
  onQuantityUpdated?: () => void;
}

export default function AddQuantity({ productionOrderId, onQuantityUpdated }: AddQuantityProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [quantityToAdd, setQuantityToAdd] = useState<number>(0);

  // Concaténation des chiffres pour le clavier numérique
  const writeQuantity = (digit: number) => {
    setQuantityToAdd(prev => {
      const prevStr = prev.toString();
      const newStr = prev === 0 ? `${digit}` : prevStr + digit.toString();
      return Number(newStr);
    });
  };

  // Clear le champ du modal
  const clear = () => setQuantityToAdd(0);

  // Valider la quantité et notifier le parent
  const validateQuantity = async () => {
    if (!productionOrderId) return;

    await updateQuantityProduction(productionOrderId, quantityToAdd);
    setQuantityToAdd(0);
    setIsOpen(false);

    if (onQuantityUpdated) onQuantityUpdated();
  };

  // Boutons rapides +5/+10/+100
  const addQuick = (value: number) => {
    setQuantityToAdd(prev => prev + value);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Boutons rapides +5/+10/+100 */}
      <div className="flex flex-row gap-2">
        <Input
          type="number"
          identification="quantity"
          value={quantityToAdd}
          onChange={(value) => setQuantityToAdd(Number(value))}
          className="text-center w-28"
        />
        <Button onClick={clear}>Clear</Button>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => addQuick(5)}>+5</Button>
        <Button onClick={() => addQuick(10)}>+10</Button>
        <Button onClick={() => addQuick(100)}>+100</Button>
      </div>

      {/* Bouton pour ouvrir le modal clavier numérique */}
      <Button onClick={() => setIsOpen(true)} variant="outline">
        Clavier numérique
      </Button>
      <Button onClick={validateQuantity}>Valider</Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4">Ajouter une quantité</h2>

            <div className="flex flex-col gap-3">
              {/* Input et Clear */}
              <div className="flex flex-row gap-2 items-center">
                <Input
                  className="w-24 text-center"
                  type="number"
                  identification="quantity"
                  value={quantityToAdd}
                  onChange={(value) => setQuantityToAdd(Number(value))}
                />
                <Button onClick={clear}>Clear</Button>
              </div>

              {/* Clavier numérique */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <Button key={n} onClick={() => writeQuantity(n)}>
                    {n}
                  </Button>
                ))}
                <Button onClick={() => writeQuantity(0)}>0</Button>
              </div>

              {/* Boutons fermer / valider */}
              <div className="flex flex-row gap-2 mt-4">
                <Button onClick={() => setIsOpen(false)}>Fermer</Button>
                <Button onClick={validateQuantity}>Valider</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
