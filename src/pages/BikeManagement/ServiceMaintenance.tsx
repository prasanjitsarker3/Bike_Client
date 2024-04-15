import {
  Button,
  DatePicker,
  Form,
  Modal,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import {
  useCreateNextServiceMutation,
  useGetAllBikeServiceMaintenanceQuery,
} from "../../redux/features/ManagerManagement/managerBikeApi";
import moment from "moment";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

const ServiceMaintenance = () => {
  const { data: allServiceMaintenanceData, isFetching } =
    useGetAllBikeServiceMaintenanceQuery(undefined);
  console.log(allServiceMaintenanceData?.data);

  const serviceTableData = allServiceMaintenanceData?.data?.map(
    ({
      _id,
      name,
      lastService,
      nextService,
      bike,
      note,
      discount,
      details,
    }: any) => ({
      key: _id,
      _id,
      name,
      lastService: moment(new Date(lastService)).format("MMM Do YY"),
      bikeName: bike?.name,
      note,
      discount,
      nextService: nextService
        ? moment(new Date(nextService)).format("MMM Do YY")
        : "Pending",
      details,
    })
  );

  const columns: TableColumnsType<any> = [
    {
      title: "User ame",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Bike Name",
      dataIndex: "bikeName",
      key: "bikeName",
    },
    {
      title: "Service Date",
      dataIndex: "lastService",
      key: "lastService",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Next Service",
      dataIndex: "nextService",
      key: "nextService",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <NextService serviceInfo={item._id} />
            {/* <Button type="primary" danger>
              Delete
            </Button> */}
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
        dataSource={serviceTableData}
        pagination={{ defaultPageSize: 5 }}
      />
    </div>
  );
};

const NextService = ({ serviceInfo }: { serviceInfo: any }) => {
  const { control, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createNextService] = useCreateNextServiceMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Service Update Processing !");
    try {
      const nextServiceData = {
        id: serviceInfo,
        nextService: data?.nextService,
      };
      const res = await createNextService(nextServiceData);
      console.log(res);
      setIsModalOpen(false);
      toast.success("Update Successfully", { id: toastId, duration: 2000 });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Next Service
      </Button>
      <Modal
        title="Next scheduled servicing date."
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
          <Form.Item label="Next Service">
            <Controller
              name="nextService"
              control={control}
              defaultValue=""
              render={({ field }) => <DatePicker {...field} />}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceMaintenance;
