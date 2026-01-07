import {describe, it, expect, vi} from "vitest";
import addMachine from "../api/addMachine"

describe("addMachine", () => {
    it("appelle l'API avec les bonnes données", async () => {
        const mockData = {
            machine_name: "Machine 1",
            short_name: "M1",
            theoritical_industrial_pace: "12",
            measurement_unit: "b/min",
        };
        globalThis.fetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve( {id: 1}),
        })
    ) as unknown as typeof fetch;

    const result = await addMachine(mockData);

    expect(globalThis.fetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/machine/create",
        expect.objectContaining({
            method: "POST",
            headers: {"Content-Type" : "application/json", "Accept": "application/json",},
            body: JSON.stringify(mockData)
        })
    );
    expect(result).toEqual({id : 1})
    })
})