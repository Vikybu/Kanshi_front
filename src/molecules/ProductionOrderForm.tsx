import getRawMaterial from "../api/getRawMaterial";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Select } from "../atoms/Select";
import { useEffect, useState } from "react";

interface RawMaterial {
  id: number;
  name: string;
  reference: string;
}

interface ProductionOrderFormProps {
  production_order_reference: string;
  raw_material: string;
  theoritical_raw_material_quantity: number | null;
  machine_name: string;
  start_time: string;
  end_time: string;
  theoritical_final_product_quantity: number | null;
  final_product_name: string;
  onProduction_order_referenceChange: (value: string) => void;
  onRaw_materialChange: (value: string) => void;
  onTheoritical_raw_material_quantityChange: (value: number | null) => void;
  onMachine_nameChange: (value: string) => void;
  onStart_timeChange: (value: string) => void;
  onEnd_timeChange: (value: string) => void;
  onTheoritical_final_product_quantityChange: (value: number | null) => void;
  onFinal_product_nameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ProductionOrderForm (
  {production_order_reference,
  raw_material,
  theoritical_raw_material_quantity,
  machine_name,
  start_time,
  end_time,
  theoritical_final_product_quantity,
  final_product_name,
  onProduction_order_referenceChange,
  onRaw_materialChange,
  onTheoritical_raw_material_quantityChange,
  onMachine_nameChange,
  onStart_timeChange,
  onEnd_timeChange,
  onTheoritical_final_product_quantityChange,
  onFinal_product_nameChange,
  onSubmit,}
: ProductionOrderFormProps) {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [selectedRawMaterial, setSelectedRawMaterial] = useState<string>("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: RawMaterial[] = await getRawMaterial(); // appelle ton API
        setRawMaterials(data);
      } catch (error) {
        console.error("Erreur lors du fetch des matières premières", error);
      }
    };

    fetchData();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      className="bg-secondary rounded-xl p-3 w-full max-w-md flex flex-col space-y-3"
    >
      <h1>Création d'un nouvel ordre de fabrication</h1>

      <Input
        type="text"
        identification="production_order_reference"
        value={production_order_reference}
        onChange={onProduction_order_referenceChange}
      >
        Référence de l'ordre de fabrication
      </Input>

       <Select
        label="Choisir une matière première"
        value={selectedRawMaterial}
        onChange={setSelectedRawMaterial}
      >
        <option value="">-- Sélectionner --</option>
        {rawMaterials.map((rawMaterial) => (
          <option key={rawMaterial.id} value={rawMaterial.id}>
            {rawMaterial.name}
          </option>
        ))}
      </Select>
 
      <Input
        type="number"
        identification="theoritical_raw_material_quantity"
        value={theoritical_raw_material_quantity ?? ""}
        onChange={(value) => onTheoritical_raw_material_quantityChange(value === "" ? null : Number(value))}
      >
        Quantité de matière première
      </Input>

      <Input
        type="text"
        identification="machine_name"
        value={machine_name}
        onChange={onMachine_nameChange}
      >
        Machine à utiliser
      </Input>

      <Input
        type="time"
        identification="start_time"
        value={start_time}
        onChange={onStart_timeChange}
      >
        Heure de début
      </Input>

      <Input
        type="time"
        identification="end_time"
        value={end_time}
        onChange={onEnd_timeChange}
      >
        Heure de fin
      </Input>

      <Input
        type="number"
        identification="theoritical_final_product_quantity"
        value={theoritical_final_product_quantity ?? ""}
        onChange={(value) => onTheoritical_final_product_quantityChange(value === "" ? null : Number(value))}
      >
        Quantité de produit final fabriqué
      </Input>

      <Input
        type="text"
        identification="final_product_name"
        value={final_product_name}
        onChange={onFinal_product_nameChange}
      >
        Produit fabriqué
      </Input>

      <div className="flex space-x-2">
        <Button type="submit">Ajouter l'ordre de fabrication</Button>
        <Button type="reset">Annuler</Button>
      </div>
    </form>
  );
};

