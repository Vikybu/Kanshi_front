import { useEffect, useState } from "react";
import getRawMaterial from "../api/getRawMaterial";
import machineList from "../api/machineList";
import simulationProductionOrder from "../api/simulationProductionOrderForm";
import createProductionOrder from "../api/createProductionOrder";
import getFinalProduct from "../api/getFinalProducts";
import checkConflits from "../api/checkConflits";
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
  measurement_unit: string;
  theoritical_industrial_pace: number;
}

interface FinalProduct {
  id: number;
  name: string;
  reference: string;
  quantity_of_product: number;
}

interface FormState {
  production_order_reference: string;
  raw_material_id: number | null;
  theoritical_raw_material_quantity: number | null;
  measurement_unit: string;
  machine_id: number | null;
  machine_theoritical_industrial_pace: number | null;
  final_products_id: number | null;
  final_product_quantity_per_product: number | null;
  theoritical_final_product_quantity: number | null;
  start_time: string;
  end_time: string;
  real_start_time: string | null;
  real_end_time: string | null;
  duration_time?: number;
}

export default function ProductionOrderForm() {
  const today = new Date();
  const minDateTime = today.toISOString().slice(0, 16);
  const actualYear = today.getFullYear().toString();

  const initialForm: FormState = {
    production_order_reference: "",
    raw_material_id: null,
    theoritical_raw_material_quantity: null,
    measurement_unit: "",
    machine_id: null,
    machine_theoritical_industrial_pace: null,
    final_products_id: null,
    final_product_quantity_per_product: null,
    theoritical_final_product_quantity: null,
    start_time: "",
    end_time: "",
    real_start_time: null,
    real_end_time: null,
    duration_time: undefined,
  };

  const [form, setForm] = useState<FormState>(initialForm);
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [finalProducts, setFinalProducts] = useState<FinalProduct[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [conflictStatus, setConflictStatus] = useState<"loading" | "ok" | "conflict" | null>(null); //ICI
  const [modifiableReference, setModifiableReference] = useState("");

  const convertToDatetimeLocal = (dateString: string) => {
    if (dateString.includes("/")) {
      const [datePart, timePart] = dateString.split(" ");
      const [day, month, year] = datePart.split("/");
      return `${year}-${month}-${day}T${timePart}`;
    }
    return dateString;
  };

  const toLaravelDateTime = (date: string) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) throw new Error("Date invalide : " + date);
    return d.toISOString().slice(0, 19).replace("T", " ");
  };

  // Récupération des données pour les selects
  useEffect(() => {
    const fetchData = async () => {
      setRawMaterials(await getRawMaterial());
      setMachines(await machineList());
      setFinalProducts(await getFinalProduct());
    };
    fetchData();
  }, []);

  // Simulation automatique de l'ordre
  useEffect(() => {
    const simulate = async () => {
      if (
        !form.start_time ||
        !form.theoritical_raw_material_quantity ||
        !form.machine_theoritical_industrial_pace ||
        !form.final_product_quantity_per_product
      ) return;

      const selectedDate = new Date(form.start_time);
      if (selectedDate < new Date()) {
        alert("Vous ne pouvez pas choisir une date passée");
        return;
      }

      const data = await simulationProductionOrder({
        theoritical_raw_material_quantity: form.theoritical_raw_material_quantity,
        final_product_quantity_per_product: form.final_product_quantity_per_product,
        machine_theoritical_industrial_pace: form.machine_theoritical_industrial_pace,
        machine_id: form.machine_id,
        measurement_unit: form.measurement_unit,
        start_time: form.start_time,
      });

      setForm((prev) => ({
        ...prev,
        theoritical_final_product_quantity: data.theoritical_final_product_quantity,
        end_time: convertToDatetimeLocal(data.end_time),
        duration_time: data.duration_minutes,
      }));
    };
    simulate();
  }, [
    form.start_time,
    form.theoritical_raw_material_quantity,
    form.machine_theoritical_industrial_pace,
    form.final_product_quantity_per_product,
  ]);

  // Vérification des conflits
  useEffect(() => {
    const check = async () => {
      if (!form.machine_id || !form.start_time || !form.end_time) {
        setConflictStatus(null);
        return;
      }

      setConflictStatus("loading");

      const data = await checkConflits(
        form.machine_id,
        toLaravelDateTime(form.start_time),
        toLaravelDateTime(form.end_time)
      );

      setConflictStatus(data.conflict ? "conflict" : "ok");
    };

    check();
  }, [form.machine_id, form.start_time, form.end_time]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (conflictStatus === "conflict" || conflictStatus === "loading") return;

    const payload = {
      production_order_reference: `OF${actualYear}${modifiableReference}`,
      raw_material_id: form.raw_material_id,
      machine_id: form.machine_id,
      final_products_id: form.final_products_id,
      theoritical_raw_material_quantity: Number(form.theoritical_raw_material_quantity),
      actual_raw_material_quantity: 0,
      start_time: toLaravelDateTime(form.start_time),
      end_time: toLaravelDateTime(form.end_time),
      real_start_time: null,
      real_end_time: null,
      duration_time: form.duration_time,
      status: "plannified",
      theoritical_final_product_quantity: Number(form.theoritical_final_product_quantity),
      actual_final_product_quantity: 0,
    };

    await createProductionOrder(payload);

    setSuccessMessage("✅ Ordre de production ajouté avec succès");
    setTimeout(() => setSuccessMessage(null), 3000);
    setForm(initialForm);
    setModifiableReference("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-secondary rounded-xl p-6 w-225 mx-auto flex flex-col space-y-4 justify-center"
      >
        <h1 className="size-smalltitle font-small-title text-center text-text underline decoration-primary decoration-2 underline-offset-6">
          Création d'un nouvel ordre de fabrication
        </h1>

        {/* Référence OF */}
        <div className="flex flex-row gap-2">
          <label className="flex flex-row items-center gap-2 font-small-title text-base text-text whitespace-nowrap">
            Référence de l'ordre de fabrication :
            <input
              className="border border-primary rounded-lg px-4 py-1 w-24 text-center"
              type="text"
              disabled
              value={`OF${actualYear}`}
            />
            <input
              className="border border-primary rounded-lg px-4 py-1 flex-1"
              type="number"
              value={modifiableReference}
              onChange={(e) => setModifiableReference(e.target.value.slice(0, 6))}
            />
          </label>
        </div>

        {/* Select matière première */}
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

        {/* Quantité matière première */}
        <Input
          type="number"
          identification="quantite_matiere"
          layout="row"
          value={form.theoritical_raw_material_quantity ?? ""}
          onChange={(value) =>
            setForm({
              ...form,
              theoritical_raw_material_quantity: value === "" ? null : Number(value),
            })
          }
        >
          Quantité de matière première (en kg)
        </Input>

        {/* Select machine */}
        <Select
          label="Choisir la machine"
          layout="row"
          value={form.machine_id ?? ""}
          onChange={(value) => {
            const selectedMachine = machines.find((m) => m.id === Number(value));
            setForm({
              ...form,
              machine_id: selectedMachine?.id ?? null,
              machine_theoritical_industrial_pace: selectedMachine?.theoritical_industrial_pace ?? null,
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

        {/* Select produit final */}
        <Select
          label="Choisir le produit final"
          layout="row"
          value={form.final_products_id ?? ""}
          onChange={(value) => {
            const selectedFinalProduct = finalProducts.find((p) => p.id === Number(value));
            setForm({
              ...form,
              final_products_id: selectedFinalProduct?.id ?? null,
              final_product_quantity_per_product: selectedFinalProduct?.quantity_of_product ?? null,
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

        {/* Quantité finale calculée */}
        <Input
          type="number"
          identification="theoritical_final_product_quantity"
          layout="row"
          value={form.theoritical_final_product_quantity ?? ""}
          disabled
        >
          Quantité de produit final fabriqué (calculée automatiquement)
        </Input>

        {/* Heures de début/fin */}
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
            type="datetime-local"
            identification="end_time"
            layout="row"
            value={form.end_time ?? ""}
            disabled
          >
            Heure de fin (calculée automatiquement)
          </Input>
        </div>

        {/* Messages de conflit */}
        {conflictStatus === "loading" && (
          <p className="text-blue-600 font-bold">🔄 Vérification en cours…</p>
        )}
        {conflictStatus === "ok" && (
          <p className="text-green-600 font-bold">✅ Pas de conflit, la machine est disponible</p>
        )}
        {conflictStatus === "conflict" && (
          <p className="text-red-600 font-bold">
            ⚠️ Cette machine est déjà occupée pendant cette plage horaire !
          </p>
        )}

        {/* Boutons + message de succès */}
        <div className="flex items-center space-x-2">
          <Button
            disabled={conflictStatus === "conflict" || conflictStatus === "loading"}
            type="submit"
          >
            Ajouter l'ordre de fabrication
          </Button>
          <Button
            type="reset"
            onClick={() => setForm(initialForm)}
          >
            Annuler
          </Button>

          {successMessage && (
            <div className="bg-green-100 text-green-800 border border-green-300 rounded-lg px-4 py-2 ml-4">
              {successMessage}
            </div>
          )}
        </div>
      </form>
    </>
  );
}
