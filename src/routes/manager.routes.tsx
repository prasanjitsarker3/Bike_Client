import AllBikeCourse from "../pages/BikeManagement/AllBikeCourse";
import AllBikeData from "../pages/BikeManagement/AllBikeData";
import CreateBike from "../pages/BikeManagement/CreateBike";
import CreateBikeCourse from "../pages/BikeManagement/CreateBikeCourse";
import Dashboard from "../pages/BikeManagement/Dashboard";
import EditAndDuplicate from "../pages/BikeManagement/EditAndDuplicate";
import EnrollCourse from "../pages/BikeManagement/EnrollCourse";
import GetBikes from "../pages/BikeManagement/GetBikes";
import ServiceMaintenance from "../pages/BikeManagement/ServiceMaintenance";
// import BikeSalesHistory from "../pages/SalesManagement/BikeSalesHistory";
import BikeTotalSaleHistory from "../pages/SalesManagement/BikeTotalSaleHistory";

export const managerRoutePaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    name: "Bike Management",
    children: [
      {
        name: "Create New Bike",
        path: "create-bike",
        element: <CreateBike />,
      },
      {
        name: "Get All Bike",
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
      // {
      //   name: "Bike Sales",
      //   path: "bike-history",
      //   element: <BikeSalesHistory />,
      // },
      {
        name: "Bike History",
        path: "total-history",
        element: <BikeTotalSaleHistory />,
      },
      {
        name: "Service Maintenance",
        path: "service-maintenance",
        element: <ServiceMaintenance />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateBikeCourse />,
      },
      {
        name: "All Bike Course",
        path: "all-bike-course",
        element: <AllBikeCourse />,
      },
      {
        name: "Enroll Course",
        path: "enroll-course",
        element: <EnrollCourse />,
      },
    ],
  },
  {
    path: "editAndDuplicated/:id",
    element: <EditAndDuplicate />,
  },
];
