/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button, Divider, Form, Input, Modal, Space, Table, Tag } from "antd";
import { useGetAllBikeQuery } from "../../redux/features/BikeApi/bikeApi";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useSaleBikeMutation } from "../../redux/features/SalesApi/salesApi";
import { toast } from "sonner";
import Search from "antd/es/input/Search";
import { SkeletonTablePage } from "../CustomPage/SkeletonPage";
import { useAppSelector } from "../../redux/hook";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../Utlis/verifyToken";
import { JwtPayload } from "jwt-decode";

interface DataType {
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

const BikeSalesHistory = () => {
  const token = useAppSelector(useCurrentToken);
  const { data, isLoading, isError } = useGetAllBikeQuery(undefined, {
    pollingInterval: 2000,
  });
  const [saleBike] = useSaleBikeMutation();
  const [open, setOpen] = useState(false);
  //Code change error when build
  // const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmLoading] = useState(false);
  const [saleId, setSaleId] = useState<string | null>(null);
  const { control, handleSubmit, reset } = useForm();
  const [filteredBikes, setFilteredBikes] = useState<DataType[]>([]);

  //verify token get email;
  let user: JwtPayload;
  if (token) {
    user = verifyToken(token);
  }

  const allBikes = data?.data;
  if (isLoading) {
    return <SkeletonTablePage />;
  }

  if (isError || !Array.isArray(allBikes)) {
    return <div>Error fetching data</div>;
  }

  const showModal = (id: string) => {
    setSaleId(id);
    setOpen(true);
  };

  // const handleOk = () => {
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setOpen(false);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Bike Sale Processing");
    try {
      const salesData = {
        saleId: saleId,
        name: data.name,
        quantity: parseInt(data.quantity),
        email: (user as TUser)!.email,
      };
      console.log("Sales Data", salesData);
      const res = await saleBike(salesData);
      console.log("Response:", res);
      toast.success("Bike Sales Successfully", { id: toastId, duration: 2000 });
      reset();
      setOpen(false);
    } catch (err: any) {
      console.error("Message", err.data.errorSources[0].message);
      const errorMessage =
        err.data.errorSources[0].message || "An error occurred";
      toast.error(errorMessage, { id: toastId, duration: 2000 });
    }
  };

  const onSearch = (value: string) => {
    const filteredData = allBikes?.filter((bike) =>
      bike.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBikes(filteredData || []);
  };

  const dataSource = filteredBikes.length > 0 ? filteredBikes : allBikes;

  return (
    <div>
      <div>
        <Search
          placeholder="input search text"
          onChange={(e) => onSearch(e.target.value)}
          style={{ width: 200 }}
        />
      </div>
      <Divider />
      <Table
        dataSource={dataSource}
        pagination={{ defaultPageSize: 4 }}
        rowKey={(record: DataType) => record.key}
      >
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Brand" dataIndex="brand" key="brand" />
        <Table.Column title="Model" dataIndex="model" key="model" />
        <Table.Column title="Color" dataIndex="color" key="color" />
        <Table.Column title="Price" dataIndex="price" key="price" />
        <Table.Column title="Quantity" dataIndex="quantity" key="quantity" />

        <Table.Column
          render={(tags: string[] | undefined) => (
            <>
              {Array.isArray(tags) &&
                tags.map((tag, index) => (
                  <Tag color="blue" key={index}>
                    {tag}
                  </Tag>
                ))}
            </>
          )}
        />
        <Table.Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <Button type="primary" onClick={() => showModal(record._id)}>
                Sell
              </Button>
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Bike Sales Section"
        open={open}
        // onOk={handleSubmit(onSubmit)}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit(onSubmit)}
            htmlType="submit"
          >
            Submit
          </Button>,
        ]}
      >
        <Form.Item label="Name">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter User Name..." required />
            )}
          />
        </Form.Item>
        <Form.Item label="Quantity">
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter Quantity..." required />
            )}
          />
        </Form.Item>
      </Modal>
    </div>
  );
};

export default BikeSalesHistory;
