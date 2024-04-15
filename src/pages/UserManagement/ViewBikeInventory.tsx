import { useParams } from "react-router-dom";
import { useGetSingleBikeQuery } from "../../redux/features/UserManagement/userBikeApi";
import { SkeletonTablePage } from "../CustomPage/SkeletonPage";

const ViewBikeInventory = () => {
  const { id } = useParams();
  const { data: singleBikeData, isLoading } = useGetSingleBikeQuery(id);
  console.log(singleBikeData?.data);
  const data = singleBikeData?.data;
  if (isLoading) {
    <SkeletonTablePage />;
    1;
  }
  return (
    <div className=" px-24">
      <h3 className=" text-center">View available inventory</h3>

      <div className="grid md:grid-cols-2 bg-slate-200 p-5">
        <h4>Name: {data?.name}</h4>
        <h4>Brand: {data?.brand}</h4>
        <h4>Type: {data?.type}</h4>
        <h4>Color: {data?.color}</h4>
        <h4>Price: {data?.price}</h4>
        <h4>Size: {data?.size}</h4>
        <h4>Quantity: {data?.quantity}</h4>
        <h4>Release Date: {data?.releaseDate}</h4>
      </div>
    </div>
  );
};

export default ViewBikeInventory;
