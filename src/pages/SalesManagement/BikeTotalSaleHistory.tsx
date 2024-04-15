import React, { useState } from "react";
import { Button, Divider, Space, Table, Tag } from "antd";
import { useSaleBikeHistoryQuery } from "../../redux/features/SalesApi/salesApi";
import { formatDate } from "../../Utlis/dateFormater";
import { SkeletonTablePage } from "../CustomPage/SkeletonPage";

interface DataType {
  key: React.Key;
  name: string;
  quantity: number;
  date: string;
}

const BikeTotalSaleHistory = () => {
  const [interval, setInterval] = useState<string>("");
  const { data, isLoading, isError } = useSaleBikeHistoryQuery(interval, {
    pollingInterval: 2000,
  });
  const saleHistory = data?.data;

  if (isLoading) {
    return <SkeletonTablePage />;
  }

  if (isError || !Array.isArray(saleHistory)) {
    return <div>Error fetching data</div>;
  }
  const fetchData = (interval: string) => {
    setInterval(interval);
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => fetchData("daily")}>Daily</Button>
        <Button onClick={() => fetchData("weekly")}>Weekly</Button>
        <Button onClick={() => fetchData("monthly")}>Monthly</Button>
        <Button onClick={() => fetchData("yearly")}>Yearly</Button>
      </Space>
      <Divider />
      <Table
        dataSource={saleHistory}
        pagination={{ defaultPageSize: 4 }}
        rowKey={(record: DataType) => record.key}
      >
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Quantity" dataIndex="quantity" key="quantity" />
        <Table.Column
          title="Date"
          dataIndex="date"
          key="date"
          render={(date: string) => formatDate(date)}
        />
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
      </Table>
    </div>
  );
};

export default BikeTotalSaleHistory;
