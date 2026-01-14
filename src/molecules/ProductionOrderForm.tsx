import { useEffect, useState } from "react";
import getRawMaterial from "../api/getRawMaterial";
import machineList from "../api/machineList";
import simulationProductionOrder from "../api/simulationProductionOrderForm";
import createProductionOrder from "../api/createProductionOrder";
import getFinalProduct from "../api/getFinalProducts";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Select } from "../atoms/Select";

interface RawMaterial {
  id: number;
  name: string;
  reference: string;
}

interface Machine {
  id: number;
  machine_name: string;
  measurement_unit: string,
  theoritical_industrial_pace: number;
}

interface FinalProduct {
  id: number;
  name: string;
  reference: string;
  quantity_of_product: number;
}

export default function ProductionOrderForm() {
  const initialForm = {
    production_order_reference: "",
    raw_material_id: null as number | null,
    theoritical_raw_material_quantity: null as number | null,
    measurement_unit: "",
    machine_id: null as number | null,
    machine_theoritical_industrial_pace: null as number | null,
    final_product_id: null as number | null,
    final_product_quantity_per_product: null as number | null,
    theoritical_final_product_quantity: null as number | null,
    start_time: "",
    end_time: "",
};

  const [form, setForm] = useState({
  production_order_reference: "",

  raw_material_id: null as number | null,
  theoritical_raw_material_quantity: null as number | null,
  measurement_unit: "",  

  machine_id: null as number | null,
  machine_theoritical_industrial_pace: null as number | null,

  final_product_id: null as number | null,
  final_product_quantity_per_product: null as number | null,

  theoritical_final_product_quantity: null as number | null,

  start_time: "",
  end_time: "",
});

  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [finalProducts, setFinalProducts] = useState<FinalProduct[]>([]);
  const [simulation, setSimulation] = useState<any>(null);
  const [modifiableReference, setModifiableReference] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const today = new Date()
  const minDateTime: string = today.toISOString().slice(0, 16);
  const actualYear: string = today.getFullYear().toString();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRawmaterial = await getRawMaterial();
        setRawMaterials(dataRawmaterial);

        const dataMachine = await machineList();
        setMachines(dataMachine);

        const dataFinalProduct = await getFinalProduct();
        setFinalProducts(dataFinalProduct);
      } catch (error) {
        console.error("Erreur lors du fetch des matières premières ou machines", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
  const simulate = async () => {
    if (!form.start_time) return;
    
    const selectedDate = new Date(form.start_time);
    const now = new Date();

    if (selectedDate < now) {
      alert("Vous ne pouvez pas choisir une date passée");
      return;
    }

    if (
      form.theoritical_raw_material_quantity &&
      form.machine_theoritical_industrial_pace &&
      form.final_product_quantity_per_product &&
      form.start_time
    ) {
      try {
        const formData = {
          theoritical_raw_material_quantity: form.theoritical_raw_material_quantity,
          final_product_quantity_per_product: form.final_product_quantity_per_product,
          machine_theoritical_industrial_pace: form.machine_theoritical_industrial_pace,
          machine_id: form.machine_id,
          measurement_unit: form.measurement_unit,
          start_time: form.start_time,
        };
        const data = await simulationProductionOrder(formData);
        
        setSimulation(data);

        setForm((prev) => ({
          ...prev,
          theoritical_final_product_quantity: data.theoritical_final_product_quantity,
          end_time: data.end_time,
        }));
      } catch (error) {
        console.error("Erreur lors de la simulation :", error);
      }
    }
  };

  simulate();
}, [
  form.theoritical_raw_material_quantity,
  form.machine_theoritical_industrial_pace,
  form.final_product_quantity_per_product,
  form.start_time,
]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toLaravelDateTime = (date?: string | null) => {
      if (!date) {
        return new Date().toISOString().slice(0, 19).replace("T", " ");
      }

      if (date.includes("/")) {
        const [datePart, timePart] = date.split(" ");
        const [day, month, year] = datePart.split("/");
        const isoDate = `${year}-${month}-${day}T${timePart}`;
        const d = new Date(isoDate);
        
        if (isNaN(d.getTime())) {
          return new Date().toISOString().slice(0, 19).replace("T", " ");
        }
        return d.toISOString().slice(0, 19).replace("T", " ");
      }

    const d = new Date(date);
      if (isNaN(d.getTime())) {
        return new Date().toISOString().slice(0, 19).replace("T", " ");
      }
      return d.toISOString().slice(0, 19).replace("T", " ");
    };

    const payload = {
      production_order_reference: `OF${actualYear}${modifiableReference ?? ""}`,

      raw_material_id: form.raw_material_id,
      machine_id: form.machine_id,
      final_product_id: form.final_product_id,

      theoritical_raw_material_quantity: Number(form.theoritical_raw_material_quantity ?? 0),
      actual_raw_material_quantity: 0,

      start_time: toLaravelDateTime(form.start_time),
      end_time: toLaravelDateTime(form.end_time),

      status: "plannified",

      theoritical_final_product_quantity: Number(form.theoritical_final_product_quantity ?? 0),
      actual_final_product_quantity: 0,
    };

    console.log("Payload envoyé au backend :", payload);

    try {
      await createProductionOrder(payload);
      setSuccessMessage("✅ Ordre de production ajouté avec succès");

      setTimeout(() => setSuccessMessage(null), 3000);

      setForm(initialForm);
      setModifiableReference("");
      setSimulation(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  return (
    <>
    {successMessage && (
      <div className="bg-green-100 text-green-800 border border-green-300 rounded-lg px-4 py-2">
        {successMessage}
      </div>
      )}
    <form onSubmit={handleSubmit} className="bg-secondary rounded-xl p-6 w-[900px] mx-auto flex flex-col space-y-4 justify-center">
      

      <h1 className="size-smalltitle font-small-title text-center text-text underline decoration-primary decoration-2 underline-offset-6">Création d'un nouvel ordre de fabrication</h1>

      <div className="flex flex-row gap-2">
        <label className="flex flex-row items-center gap-2 size-text font-family-[--font-family-text] text-text whitespace-nowrap">Référence de l'ordre de fabrication :
          <input 
          className="border border-primary rounded-lg px-4 py-1 w-24 text-center"
          type = "text"
          disabled = {true}
          value={`OF${actualYear}`}
          />
          <input 
          className="border border-primary rounded-lg px-4 py-1 flex-1"
          type='number'
          value={modifiableReference}
          onChange={(e) => setModifiableReference(e.target.value.slice(0, 6))}
          />
        </label>
      </div>

      <Select
        label="Choisir une matière première"
        layout="row"
        value={form.raw_material_id === null ? "" : String(form.raw_material_id)}
        onChange={(value) => setForm({ ...form, raw_material_id: Number(value) })}
      >
        <option value="">-- Sélectionner --</option>
        {rawMaterials.map((raw) => (
          <option key={raw.id} value={raw.id}>
            {raw.name} ({raw.reference})
          </option>
        ))}
      </Select>

      <Input
        type="number"
        identification="quantite_matiere"
        layout="row"
        value={form.theoritical_raw_material_quantity ?? ""}
        onChange={(value) =>
          setForm({
            ...form,
            theoritical_raw_material_quantity:
              value === "" ? null : Number(value),
          })
        }
      >
        Quantité de matière première (en kg)
      </Input>

      <Select
        label="Choisir la machine"
        layout="row"
        value={form.machine_id ?? ""}
        onChange={(value) => {
          const selectedMachine = machines.find(
            (machine) => machine.id === Number(value)
          );

          setForm({
            ...form,
            machine_id: selectedMachine?.id ?? null,
            machine_theoritical_industrial_pace:
              selectedMachine?.theoritical_industrial_pace ?? null,
            measurement_unit: selectedMachine?.measurement_unit ?? "",
          });
        }}
      >
        <option value="">-- Sélectionner --</option>
        {machines.map((machine) => (
          <option key={machine.id} value={machine.id}>
            {machine.machine_name}
          </option>
        ))}
      </Select>

      <Select
        label="Choisir le produit final"
        layout="row"
        value={form.final_product_id ?? ""}
        onChange={(value) => {
          const selectedFinalProduct = finalProducts.find(
            (product) => product.id === Number(value)
          );

          setForm({
            ...form,
            final_product_id: selectedFinalProduct?.id ?? null,
            final_product_quantity_per_product:
              selectedFinalProduct?.quantity_of_product ?? null,
          });
        }}
      >
        <option value="">-- Sélectionner --</option>
        {finalProducts.map((finalProduct) => (
          <option key={finalProduct.id} value={finalProduct.id}>
            {finalProduct.name}
          </option>
        ))}
      </Select>

      <Input
        type="number"
        identification="theoritical_final_product_quantity"
        layout="row"
        value={form.theoritical_final_product_quantity ?? ""}
        disabled
      >
        Quantité de produit final fabriqué (calculée automatiquement)
      </Input>

        <div className="flex flex-row gap-3">
          <Input
            type="datetime-local"
            identification="start_time"
            layout="row"
            value={form.start_time}
            min={minDateTime}
            onChange={(value) => setForm({ ...form, start_time: value })}
          >
            Heure de début
          </Input>

          <Input
            type="text"
            identification="end_time"
            layout="row"
            value={form.end_time ?? ""}
            disabled
            onChange={(value) => setForm({ ...form, end_time: value })}
          >
            Heure de fin (calculée automatiquement)
          </Input>
        </div>
    
      {simulation?.conflit_planning && (
        <p className="text-red-600 font-bold">
          ⚠️ Conflit : cette machine est déjà occupée à cet horaire !
        </p>
      )}

      <div className="flex space-x-2">
        <Button type="submit">Ajouter l'ordre de fabrication</Button>
        <Button
          type="reset"
          onClick={() =>
            setForm({
              production_order_reference: "",

              raw_material_id: null,
              theoritical_raw_material_quantity: null,

              machine_id: null,
              machine_theoritical_industrial_pace: null,
              measurement_unit: "",

              final_product_id: null,
              final_product_quantity_per_product: null,

              theoritical_final_product_quantity: null,

              start_time: "",
              end_time: "",
            })
          }
        >
          Annuler
        </Button>
      </div>
    </form>
    </>
  );
}


