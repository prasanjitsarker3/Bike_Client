/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button, Col, Divider, Form, Input, Row, Table } from "antd";
import type { TableColumnsType } from "antd";
import {
  useBulkDeleteBikeMutation,
  useGetAllBikeQuery,
} from "../../redux/features/BikeApi/bikeApi";
// import { formatDate } from "../../Utlis/dateFormater";
import { toast } from "sonner";
import { SkeletonTablePage } from "../CustomPage/SkeletonPage";

interface TTableData {
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
}

const GetBikes = () => {
  const [selectionType] = useState<"checkbox" | "radio">("checkbox");
  // const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
  //   "checkbox"
  // );
  const [selectBox, setSelectBox] = useState<React.Key[]>([]);
  const [bulkDeleteBike] = useBulkDeleteBikeMutation();
  const [filters, setFilters] = useState({
    name: "",
    brand: "",
    model: "",
    type: "",
    color: "",
    price: "",
    size: "",
    quantity: "",
  });

  const { data, isLoading, isError } = useGetAllBikeQuery(undefined, {
    pollingInterval: 3000,
  });
  const allBikes = data?.data;
  if (isLoading) {
    return <SkeletonTablePage />;
  }

  if (isError || !Array.isArray(allBikes)) {
    return <div>Error fetching data</div>;
  }

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Brand",
      key: "brand",
      dataIndex: "brand",
    },
    {
      title: "Model",
      key: "model",
      dataIndex: "model",
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
    },
    {
      title: "Color",
      key: "color",
      dataIndex: "color",
    },
    {
      title: "Size",
      key: "size",
      dataIndex: "size",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Release Date",
      key: "releaseDate",
      dataIndex: "releaseDate",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`);
      setSelectBox(selectedRowKeys);
    },
  };

  const handleBulkDeleted = async () => {
    try {
      const toastId = toast.loading("Bulk Deleting Processing !");
      await bulkDeleteBike({ bulk: selectBox }).unwrap();
      toast.success("Bulk Deleting Successfully !", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.error("Error occurred while bulk deleting:", error);
      toast.error("Error occurred while bulk deleting !", { duration: 2000 });
    }
  };

  const handleFilterChange = (changedValues: any) => {
    setFilters({ ...filters, ...changedValues });
  };

  const filteredData = allBikes?.filter((bike: any) => {
    return Object.entries(filters).every(([key, filterValue]) => {
      if (!filterValue) return true;
      const glassValue = bike[key]?.toString().toLowerCase() || "";
      return glassValue.includes(filterValue.toLowerCase());
    });
  });

  return (
    <div>
      <Form
        onValuesChange={(_, changedValues) => handleFilterChange(changedValues)}
      >
        <Row gutter={16}>
          <Col span={5}>
            <Form.Item label="Name" name="name">
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Brand" name="brand">
              <Input placeholder="Brand" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Model" name="model">
              <Input placeholder="Model" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Type" name="type">
              <Input placeholder="Type" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Color" name="color">
              <Input placeholder="Color" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Price" name="price">
              <Input placeholder="Price" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Quantity" name="quantity">
              <Input placeholder="Quantity" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Size" name="size">
              <Input placeholder="Size" />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Divider />
      <Button onClick={handleBulkDeleted} type="primary" className=" mb-3">
        {" "}
        Bulk Delete
      </Button>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={filteredData || []}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default GetBikes;
