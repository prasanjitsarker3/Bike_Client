import BikeSalesHistory from "../pages/SalesManagement/BikeSalesHistory";
import AllBike from "../pages/UserManagement/AllBike";
import InvoiceDownload from "../pages/UserManagement/InvoiceDownload";
import OfferedCoures from "../pages/UserManagement/OfferedCoures";
import UserDashboard from "../pages/UserManagement/UserDashboard";
import UserSaleBike from "../pages/UserManagement/UserSaleBike";
import UserService from "../pages/UserManagement/UserService";
import ViewBikeInventory from "../pages/UserManagement/ViewBikeInventory";

export const userRoutePaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "All Inventory Bike",
    path: "all-bike",
    element: <AllBike />,
  },
  {
    name: "Bike Sales",
    path: "bike-history",
    element: <BikeSalesHistory />,
  },
  {
    path: "view-bike-inventory/:id",
    element: <ViewBikeInventory />,
  },
  {
    name: "User Buy Bike",
    path: "user-sales-bike",
    element: <UserSaleBike />,
  },
  {
    path: "invoice-download/:id",
    element: <InvoiceDownload />,
  },
  {
    name: "Maintenance Service",
    path: "user-service",
    element: <UserService />,
  },
  {
    name: "Offered Course",
    path: "offer-course",
    element: <OfferedCoures />,
  },
];
