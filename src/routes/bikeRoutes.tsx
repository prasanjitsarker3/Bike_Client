import { NavLink } from "react-router-dom";
import AllBikeData from "../pages/BikeManagement/AllBikeData";
import CreateBike from "../pages/BikeManagement/CreateBike";
import Dashboard from "../pages/BikeManagement/Dashboard";
import BikeSalesHistory from "../pages/SalesManagement/BikeSalesHistory";
import { TRoute, TSidebarItem } from "../Types/RouteTypes";
import EditAndDuplicate from "../pages/BikeManagement/EditAndDuplicate";
import GetBikes from "../pages/BikeManagement/GetBikes";
import BikeTotalSaleHistory from "../pages/SalesManagement/BikeTotalSaleHistory";

export const bikeRoutePaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    name: "Bike Management",
    children: [
      {
        name: "Create Bike",
        path: "create-bike",
        element: <CreateBike />,
      },
      {
        name: "All Bike",
        path: "all-bike",
        element: <AllBikeData />,
      },
      {
        name: "Get Bikes",
        path: "get-bikes",
        element: <GetBikes />,
      },
    ],
  },
  {
    name: "Sales Management",
    children: [
      {
        name: "Bike Sales",
        path: "bike-history",
        element: <BikeSalesHistory />,
      },
      {
        name: "Bike History",
        path: "total-history",
        element: <BikeTotalSaleHistory />,
      },
    ],
  },
  {
    path: "editAndDuplicated/:id",
    element: <EditAndDuplicate />,
  },
];

export const bikeRoutes = bikeRoutePaths.reduce((acc: TRoute[], item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }
  if (item.children) {
    item.children.forEach((child) => {
      acc.push({
        path: child.path,
        element: child.element,
      });
    });
  }
  return acc;
}, []);

export const bikeSidebarItems = bikeRoutePaths.reduce(
  (acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }
    return acc;
  },
  []
);
