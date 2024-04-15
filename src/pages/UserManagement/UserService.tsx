import { Table, TableColumnsType } from "antd";
import { verifyToken } from "../../Utlis/verifyToken";
import { useGetUserServiceRequestQuery } from "../../redux/features/UserManagement/userBikeApi";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";
import moment from "moment";

const UserService = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  const email = (user as TUser)!.email;
  const { data: userServiceData, isFetching } =
    useGetUserServiceRequestQuery(email);

  const serviceTableData =
    userServiceData?.data &&
    userServiceData?.data?.map(
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
      title: "Next Service",
      dataIndex: "nextService",
      key: "nextService",
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

export default UserService;
