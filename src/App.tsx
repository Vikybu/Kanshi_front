import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUserStore } from "./stores/userStore.ts";

import LoginPage from "./pages/LoginPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import Machine from "./pages/Machine.tsx";
import CreateMachinePage from "./pages/CreateMachinePage.tsx";
import FabricationOrderPage from "./pages/FabricationOrderPage.tsx";
import MachineList from "./pages/MachineList.tsx";
import ProductionPage from "./pages/ProductionPage.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import NoProduction from "./pages/NoProduction.tsx";
import UserLayout from "./pages/UserLayout.tsx";

export default function App() {
  const { user } = useUserStore();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoute role="operator" />}>
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<UserPage />} />
            <Route path="production/:id" element={<ProductionPage />} />
            <Route path="production/none" element={<NoProduction />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<AdminPage />}>
            <Route path="machine" element={<Machine />}>
              <Route index element={<MachineList />} />
              <Route path="create" element={<CreateMachinePage />} />
            </Route>
            <Route path="of" element={<FabricationOrderPage />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            user?.authorization === "admin" ? <Navigate to="/admin" replace /> :
            user?.authorization === "operator" ? <Navigate to="/user" replace /> :
            <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
}