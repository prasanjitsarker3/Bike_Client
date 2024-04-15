import {
  useCreateServiceRequestMutation,
  useGetUserByeBikeQuery,
} from "../../redux/features/UserManagement/userBikeApi";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";
import { verifyToken } from "../../Utlis/verifyToken";
import { Button, Form, Modal, Space, Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import TextArea from "antd/es/input/TextArea";
import { toast } from "sonner";

const UserSaleBike = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  const email = (user as TUser)!.email;
  const { data: userBikeData, isFetching } = useGetUserByeBikeQuery(email);
  console.log("Check", userBikeData?.data);

  const bikeTableData = userBikeData?.data?.map(
    ({ _id, name, saleId, date, quantity }: any) => ({
      key: _id,
      _id,
      name,
      bikeName: saleId?.name,
      bikeBrand: saleId?.brand,
      bike: saleId?._id,
      price: saleId?.price,
      quantity,
      date,
    })
  );

  const columns: TableColumnsType<any> = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Bike Name",
      dataIndex: "bikeName",
      key: "bikeName",
    },
    {
      title: "Brand",
      dataIndex: "bikeBrand",
      key: "bikeBrand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/user/invoice-download/${item._id}`}>
              <Button>Invoice Download</Button>
            </Link>
            <RequestService bikeInfo={item} />
          </Space>
        );
      },
      width: "1%",
    },
  ];

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={bikeTableData}
        pagination={{ defaultPageSize: 5 }}
      />
    </div>
  );
};

const RequestService = ({ bikeInfo }: { bikeInfo: any }) => {
  const token = useAppSelector(useCurrentToken);
  const [requestService] = useCreateServiceRequestMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit } = useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let user;
  if (token) {
    user = verifyToken(token);
  }
  const email = (user as TUser)!.email;
  const name = (user as TUser)!.name;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading(
      "Maintenance and Servicing Request Processing"
    );
    try {
      const serviceData = {
        name: name,
        email: email,
        ...data,
        saleBike: bikeInfo?._id,
        bike: bikeInfo?.bike,
      };
      const res = await requestService(serviceData);
      console.log(res);
      setIsModalOpen(false);
      toast.success("Maintenance and Servicing Request Successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong !", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Maintenance and Service
      </Button>
      <Modal
        title="Service Request"
        visible={isModalOpen} // Corrected prop name
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Service Note">
            <Controller
              name="note"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder="Enter here..."
                  className=" w-full"
                />
              )}
            />
          </Form.Item>
          <Form.Item label="Service Details">
            <Controller
              name="details"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder="Enter here..."
                  className=" w-full"
                />
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserSaleBike;
