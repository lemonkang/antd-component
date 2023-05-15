import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { SignInPage } from "@/views/SignIn/SignInPage";
import { PayoutIndexPage } from "@/views/Payout/PayoutIndexPage";
import { PublicAuth } from "@/router/PublicAuth";
import { PrivateAuth } from "@/router/PrivateAuth";
import { DashboardLayout } from "@/features/Layout/DashboardLayout/DashboardLayout";
import { ModuleDevPage } from "@/views/ComponentsGallery/ModuleDevPage";
import { TempDashboard } from "@/features/Layout/TempDashboard/TempDashboard";

export function Router() {
  return <RouterProvider router={RoutingSheets} />;
}

const RoutingSheets = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <PrivateAuth>
        <TempDashboard />
      </PrivateAuth>
    ),
    children: [
      {
        index: true,
        element: <PayoutIndexPage />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <PublicAuth />,
    children: [
      {
        index: true,
        element: <SignInPage />,
      },
    ],
  },
  {
    path: "/dev/module-panel",
    element: <ModuleDevPage />,
  },
  {
    index: true,
    element: <Navigate to={"/sign-in"} />,
  },
]);
