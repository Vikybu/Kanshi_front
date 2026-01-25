import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";
import MachinePage from "../pages/MachineList";
import CreateMachinePage from "../pages/CreateMachinePage";
import FabricationOrderPage from "../pages/FabricationOrderPage";
import ProductionPage from "../pages/ProductionPage";
import NoProduction from "../pages/NoProduction";

const routes = [
  {
    name: "login",
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    roles: ["admin"],
    children: [
      {path: 'machine', element: <MachinePage />, children : [
        {path: 'create', element: <CreateMachinePage />}
      ]},
      {path: 'fo', element:<FabricationOrderPage />}
    ]
  },
  {
    name: "user",
    path: "/user",
    element: <UserPage />,
    roles: ["operator"],
    children: [
      {path: 'production/:id', element: <ProductionPage />},
      {path: 'production/none', element: <NoProduction />},
    ]
  },
];

export default routes;