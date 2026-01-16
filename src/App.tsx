import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUserStore } from "./stores/userStore.ts";

import LoginPage from "./pages/LoginPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import Machine from "./pages/Machine.tsx";
import CreateMachinePage from "./pages/CreateMachinePage.tsx";
import FabricationOrderPage from "./pages/FabricationOrderPage.tsx";
import MachineList from "./pages/MachineList.tsx";

function ProtectedRoute({ children, role }: { children: React.ReactNode, role?: string }) {
  const { user } = useUserStore();

  if (!user) return <Navigate to="/" replace />; 
  if (role && user.authorization !== role) return <Navigate to="/" replace />; 
  return children;
}

export default function App() {
  const { user } = useUserStore();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/user"
          element={
            <ProtectedRoute role="operator">
              <UserPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        >
          <Route path="machine" element={<Machine />}>
            <Route index element={<MachineList />} />
            <Route path="create" element={<CreateMachinePage />} />
          </Route>

          <Route path="of" element={<FabricationOrderPage />}>
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