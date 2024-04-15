import { Table, Tag, Space, Modal, Input, Form, Button } from "antd";
import { useEffect, useState } from "react";
import {
  useDeleteBikeMutation,
  useGetAllBikeQuery,
  useUpdateBikeInfoMutation,
} from "../../redux/features/BikeApi/bikeApi";
import { formatDate } from "../../Utlis/dateFormater";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { SkeletonTablePage } from "../CustomPage/SkeletonPage";

interface BikeData {
  key: React.Key;
  name: string;
  brand: string;
  model: string;
  type: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  releaseDate: string;
  _id: string;
  tags: string[];
}

const AllBikeData = () => {
  const [open, setOpen] = useState(false);
  const [bikeData, setBikeData] = useState<BikeData | null>(null);
  const { control, handleSubmit, reset, setValue } = useForm();
  const [updateBikeInfo] = useUpdateBikeInfoMutation();
  const [deleteBike] = useDeleteBikeMutation();
  const { data, isLoading, isError } = useGetAllBikeQuery(undefined, {
    pollingInterval: 3000,
  });
  const allBikes = data?.data;

  useEffect(() => {
    if (bikeData) {
      setValue("name", bikeData.name);
      setValue("brand", bikeData.brand);
      setValue("model", bikeData.model);
      setValue("type", bikeData.type);
      setValue("color", bikeData.color);
      setValue("size", bikeData.size);
      setValue("price", bikeData.price);
      setValue("quantity", bikeData.quantity);
      setValue("_id", bikeData._id);
      setValue("releaseDate", formatDate(bikeData.releaseDate));
    }
  }, [bikeData, setValue]);

  if (isLoading) return <SkeletonTablePage />;
  if (isError) return <div>Error fetching data</div>;

  if (!Array.isArray(allBikes)) {
    console.error("Data is not an array:", allBikes);
    return <div>Error: Data is not an array</div>;
  }

  const showModal = (record: BikeData) => {
    setBikeData(record);
    setOpen(true);
  };

  const onSubmit = async (data: FieldValues) => {
    console.log("Edit Ing Data", data);
    const toatsId = toast.loading("Bike information editing...");
    try {
      const updatedData = {
        name: data.name,
        brand: data.brand,
        model: data.model,
        type: data.type,
        color: data.color,
        size: data.size,
        price: parseInt(data.price),
        quantity: parseInt(data.quantity),
      };
      const res = await updateBikeInfo({ id: data._id, updatedData }).unwrap();
      console.log(res);
      toast.success("Bike edit information successful update", {
        id: toatsId,
        duration: 2000,
      });
      reset();
      setOpen(false);
    } catch (err: any) {
      console.error("Message", err.data.errorSources[0].message);
      const errorMessage =
        err.data.errorSources[0].message || "An error occurred";
      toast.error(errorMessage, { id: toatsId, duration: 2000 });
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setBikeData(null);
  };

  const handleDeleteBike = async (id: string) => {
    const toastId = toast.loading("Bike Deleted Loading...");
    try {
      const res = await deleteBike({ id }).unwrap();
      console.log(res);
      toast.success("Successfully Deleted Bike", {
        id: toastId,
        duration: 2000,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Table
        dataSource={allBikes}
        pagination={{ defaultPageSize: 4 }}
        rowKey={(record: BikeData) => record.key}
      >
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Brand" dataIndex="brand" key="brand" />
        <Table.Column title="Model" dataIndex="model" key="model" />
        <Table.Column title="Type" dataIndex="type" key="type" />
        <Table.Column title="Color" dataIndex="color" key="color" />
        <Table.Column title="Size" dataIndex="size" key="size" />
        <Table.Column title="Price" dataIndex="price" key="price" />
        <Table.Column title="Quantity" dataIndex="quantity" key="quantity" />
        <Table.Column
          title="Date"
          dataIndex="releaseDate"
          key="releaseDate"
          render={(releaseDate: string) => formatDate(releaseDate)}
        />
        <Table.Column
          render={(tags: string[]) => (
            <>
              {Array.isArray(tags) &&
                tags.map((tag) => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
            </>
          )}
        />
        <Table.Column
          title="Action"
          key="action"
          render={(_: any, record: BikeData) => (
            <Space size="middle">
              <Button
                type="primary"
                onClick={() => showModal(record)}
                // className="bg-blue-800 px-2 py-1 text-white cursor-pointer"
              >
                Edit
              </Button>
              <Link
                to={`/editAndDuplicated/${record._id}`}
                className="bg-green-600 px-2 py-2 text-white rounded-md"
              >
                Edit&Duplicate
              </Link>
              <Button
                type="primary"
                danger
                onClick={() => handleDeleteBike(record._id)}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Edit Bike"
        visible={open}
        // onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit(onSubmit)}
            htmlType="submit"
          >
            Submit
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        {bikeData && (
          <Form layout="vertical">
            <div className="grid grid-cols-2 gap-2">
              <Form.Item label="Name">
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter User Name..." />
                  )}
                />
              </Form.Item>

              <Form.Item label="Brand">
                <Controller
                  name="brand"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter Brand..." />
                  )}
                />
              </Form.Item>
              <Form.Item label="Model">
                <Controller
                  name="model"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
              <Form.Item label="Type">
                <Controller
                  name="type"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
              <Form.Item label="Color">
                <Controller
                  name="color"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
              <Form.Item label="Size">
                <Controller
                  name="size"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
              <Form.Item label="Price">
                <Controller
                  name="price"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
              <Form.Item label="Quantity">
                <Controller
                  name="quantity"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <Input {...field} required />}
                />
              </Form.Item>
              <Form.Item label="Release Date">
                <Controller
                  name="releaseDate"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
              <Form.Item label="Bike Id">
                <Controller
                  name="_id"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <Input {...field} disabled />}
                />
              </Form.Item>
            </div>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default AllBikeData;
