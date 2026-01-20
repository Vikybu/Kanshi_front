import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

export default function ProtectedRoute({ role }: { role?: string }) {
  const { user } = useUserStore();

  if (!user) return <Navigate to="/" replace />;
  if (role && user.authorization !== role) return <Navigate to="/" replace />;

  return <Outlet />
}
