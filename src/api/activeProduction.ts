import type { NavigateFunction } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useProductionStore } from "../stores/useProductionStore";

interface ActiveProductionResponse {
  active: boolean;
  production_order_id?: string;
}

export default async function activeProduction(navigate: NavigateFunction) {
  const user = useUserStore.getState().user;

  if (!user?.id) {
    console.warn("Aucun utilisateur connecté.");
    return;
  }

  try {
    const res = await fetch("http://localhost:8000/api/user/production-order/active", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user_id: user.id }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Erreur API:", res.status, text);
      return;
    }

    const data: ActiveProductionResponse = await res.json();

    if (data.active && data.production_order_id) {
      useProductionStore.getState().setActiveProduction(data.production_order_id);
      navigate(`/user/production/${data.production_order_id}`);
    } else {
      useProductionStore.getState().clearActiveProduction();
      navigate("/user/production/none");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la production active :", error);
  }
}