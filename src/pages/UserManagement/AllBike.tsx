import { Button, Space, Table, TableColumnsType } from "antd";
import { useGetAllBikeQuery } from "../../redux/features/BikeApi/bikeApi";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { Link } from "react-router-dom";

const AllBike = () => {
  const { data: bikeData, isFetching } = useGetAllBikeQuery(undefined);
  const [searchText, setSearchText] = useState<string>("");

  console.log(bikeData?.data);
  const bikeTableData = bikeData?.data?.map(
    ({ _id, name, brand, model, type, color, price }: any) => ({
      key: _id,
      _id,
      name,
      brand,
      model,
      type,
      color,
      price,
    })
  );

  const columns: TableColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/user/view-bike-inventory/${item._id}`}>
              <Button>View</Button>
            </Link>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredData = bikeTableData?.filter((item: any) =>
    Object.values(item).some((val: any) =>
      val.toString().toLowerCase().includes(searchText)
    )
  );

  return (
    <div>
      <Search
        className=" mb-3"
        placeholder="input search text"
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: 200 }}
      />
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={filteredData}
        pagination={{ defaultPageSize: 5 }}
      />
    </div>
  );
};

export default AllBike;
