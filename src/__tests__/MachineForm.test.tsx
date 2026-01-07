import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MachineForm from "../molecules/MachineForm";

describe("MachineForm", () => {
  it("remplit le formulaire et appelle onSubmit", () => {
    // Création de fonctions mock
    const mockSubmit = vi.fn();
    const mockMachineName = vi.fn();
    const mockShortName = vi.fn();
    const mockTheoriticalPace = vi.fn();
    const mockMeasurementUnit = vi.fn();
    const mockProduct1 = vi.fn();
    const mockProduct2 = vi.fn();
    const mockProduct3 = vi.fn();

    render(
      <MachineForm
        machine_name=""
        short_name=""
        theoritical_industrial_pace=""
        measurement_unit=""
        product1=""
        product2=""
        product3=""
        onMachine_nameChange={mockMachineName}
        onShort_nameChange={mockShortName}
        onTheoritical_industrial_paceChange={mockTheoriticalPace}
        onMeasurement_unitChange={mockMeasurementUnit}
        onProduct1Change={mockProduct1}
        onProduct2Change={mockProduct2}
        onProduct3Change={mockProduct3}
        onSubmit={mockSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText("Nom de la machine"), {
      target: { value: "Machine 1" },
    });
    expect(mockMachineName).toHaveBeenCalledWith("Machine 1");

    fireEvent.change(screen.getByLabelText("Raccourci nom de la machine"), {
      target: { value: "M1" },
    });
    expect(mockShortName).toHaveBeenCalledWith("M1");

    fireEvent.change(screen.getByLabelText("Cadence théorique"), {
      target: { value: "12" },
    });
    expect(mockTheoriticalPace).toHaveBeenCalledWith("12");

    fireEvent.change(
      screen.getByLabelText("Unité de mesure de la cadence théorique"),
      { target: { value: "b/min" } }
    );
    expect(mockMeasurementUnit).toHaveBeenCalledWith("b/min");

    // Cliquer sur le bouton submit
    fireEvent.click(screen.getByText("Ajouter la machine"));

    // Vérifie que onSubmit a été appelé
    expect(mockSubmit).toHaveBeenCalled();
  });
});