import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AddMachine from "../components/AddMachine";
import * as api from "../api/addMachine";

describe("AddMachine", () => {
  it("remplit le formulaire et appelle l'API", async () => {
    // Mock de la fonction API
    vi.spyOn(api, "default").mockResolvedValue({ id: 1 });

    render(<AddMachine />);

    // Remplir les champs
    fireEvent.change(screen.getByLabelText("Nom de la machine"), {
      target: { value: "Machine 1" },
    });
    fireEvent.change(screen.getByLabelText("Raccourci nom de la machine"), {
      target: { value: "M1" },
    });
    fireEvent.change(screen.getByLabelText("Cadence théorique"), {
      target: { value: "12" },
    });
    fireEvent.change(
      screen.getByLabelText("Unité de mesure de la cadence théorique"),
      { target: { value: "b/min" } }
    );

    // Cliquer sur le bouton submit
    fireEvent.click(screen.getByText("Ajouter la machine"));

    // Vérifie que la fonction API a été appelée
    await waitFor(() => {
      expect(api.default).toHaveBeenCalledWith({
        machine_name: "Machine 1",
        short_name: "M1",
        theoritical_industrial_pace: "12",
        measurement_unit: "b/min",
      });
    });
  });
});