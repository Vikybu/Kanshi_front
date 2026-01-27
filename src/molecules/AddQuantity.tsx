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

  const writeQuantity = (digit: number) => {
    setQuantityToAdd(prev => {
      const prevStr = prev.toString();
      const newStr = prev === 0 ? `${digit}` : prevStr + digit.toString();
      return Number(newStr);
    });
  };

  const clear = () => setQuantityToAdd(0);

  const validateQuantity = async () => {
    if (!productionOrderId) return;

    await updateQuantityProduction(productionOrderId, quantityToAdd);
    setQuantityToAdd(0);
    setIsOpen(false);

    if (onQuantityUpdated) onQuantityUpdated();
  };

  const addQuick = (value: number) => {
    setQuantityToAdd(prev => prev + value);
  };

  return (
  <div className="flex flex-col gap-3">
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

    <div className="grid grid-cols-3 gap-2">
      <Button className="bg-tertiaire px-4 py-2 flex items-center justify-center" onClick={() => addQuick(5)}>+5</Button>
      <Button className="bg-tertiaire px-4 py-2 flex items-center justify-center" onClick={() => addQuick(10)}>+10</Button>
      <Button className="bg-tertiaire px-4 py-2 flex items-center justify-center" onClick={() => addQuick(100)}>+100</Button>
    </div>

    <div className="flex flex-col gap-2">
      <Button onClick={() => setIsOpen(true)} variant="outline">
        Clavier numérique
      </Button>
      <Button className="bg-greenColor" onClick={validateQuantity}>Valider</Button>
    </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4 text-center">Ajouter une quantité</h2>

            <div className="flex flex-col gap-3">
              {/* Ligne Input + Clear */}
              <div className="grid grid-cols-2 gap-2">
                <Input
                  className="col-span-2 text-center w-full"
                  type="number"
                  identification="quantity"
                  value={quantityToAdd}
                  onChange={(value) => setQuantityToAdd(Number(value))}
                />
                <Button className="w-full bg-redColor" onClick={clear}>
                  Clear
                </Button>
              </div>

              {/* Clavier numérique 1 à 9 */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <Button key={n} onClick={() => writeQuantity(n)}>
                    {n}
                  </Button>
                ))}
              </div>

              {/* Bouton 0 centré */}
              <div className="flex justify-center">
                <Button className="w-[calc(33.333%)]" onClick={() => writeQuantity(0)}>
                  0
                </Button>
              </div>

              {/* Boutons Fermer + Valider */}
              <div className="flex gap-2 mt-4">
                <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={() => setIsOpen(false)}>
                  Fermer
                </Button>
                <Button className="flex-1 bg-greenColor" onClick={validateQuantity}>
                  Valider
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
