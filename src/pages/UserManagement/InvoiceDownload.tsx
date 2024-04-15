import { useParams } from "react-router-dom";
import { useGetSingleSaleBikeQuery } from "../../redux/features/UserManagement/userBikeApi";
import { Button } from "antd";
import { SkeletonTablePage } from "../CustomPage/SkeletonPage";
import { usePDF } from "react-to-pdf";

const InvoiceDownload = () => {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const { id } = useParams();
  const {
    data: singleSaleBikeData,
    isFetching,
    isLoading,
  } = useGetSingleSaleBikeQuery(id);
  const data = singleSaleBikeData?.data;
  if (isFetching) {
    <h1>Loading Data ...</h1>;
  }
  return (
    <div className=" p-5">
      {isLoading ? (
        <SkeletonTablePage />
      ) : (
        <div
          ref={targetRef}
          className="w-full flex md:flex-row flex-col justify-around items-center bg-slate-100 p-5"
        >
          <div className="w-1/2 mx-auto border-2 border-red-400">
            <h3 className="text-center">User Information</h3>
            <div>
              <h4>Name: {data?.name}</h4>
              <h4>Email: {data?.email}</h4>
              <h4>Order Date: {data?.date}</h4>
              <h4>Order Quantity: {data?.quantity}</h4>
            </div>
          </div>
          <div className="w-1/2 mx-auto border-2 border-cyan-500">
            <h3 className="text-center">Sales Information</h3>
            <h4>Bike Name: {data?.saleId?.name}</h4>
            <h4>Brand: {data?.saleId?.brand}</h4>
            <h4>Model: {data?.saleId?.model}</h4>
            <h4>Total Price: {data?.saleId?.price}</h4>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-3">
        <Button onClick={() => toPDF()}>Download</Button>
      </div>
    </div>
  );
};

export default InvoiceDownload;
