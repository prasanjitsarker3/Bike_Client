/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Space, Table, TableColumnsType } from "antd";
import { useAllBikeCourseQuery } from "../../redux/features/ManagerManagement/managerBikeApi";
import moment from "moment";
import { useAppSelector } from "../../redux/hook";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../Utlis/verifyToken";
import {
  useCreateEnrollCourseMutation,
  useGetEnrollCOurseQuery,
} from "../../redux/features/UserManagement/userBikeApi";
import { toast } from "sonner";

const OfferedCoures = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  const email = (user as TUser)!.email;
  const name = (user as TUser)!.name;

  const { data: bikeCourseData, isFetching } = useAllBikeCourseQuery(undefined);
  const [createdEnroll] = useCreateEnrollCourseMutation();
  const { data: enrollCourseData } = useGetEnrollCOurseQuery(email || "");

  const courseTableData =
    bikeCourseData?.data &&
    bikeCourseData?.data?.map(
      ({
        _id,
        instructor,
        title,
        startDate,
        duration,
        difficulty,
        enroll,
        maxParticipants,
        location,
        description,
      }: any) => ({
        key: _id,
        _id,
        instructor,
        title,
        startDate: moment(new Date(startDate)).format("MMM Do YY"),
        duration,
        enroll,
        difficulty,
        maxParticipants,
        location,
        description,
      })
    );

  const handleEnrollCourse = async (id: string) => {
    const enrollData = {
      name: name,
      email: email,
      course: id,
    };
    await createdEnroll(enrollData);
    toast.success("Enroll Successfully");
  };

  const columns: TableColumnsType<any> = [
    {
      title: "Instructor Name",
      dataIndex: "instructor",
      key: "instructor",
    },
    {
      title: "Course Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
    },
    {
      title: "Max Participants",
      dataIndex: "maxParticipants",
      key: "maxParticipants",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Enroll",
      dataIndex: "enroll",
      key: "enroll",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        const isEnrolled =
          enrollCourseData?.data &&
          enrollCourseData?.data.some(
            (data: any) => data?.course?._id === item._id
          );
        return (
          <Space>
            {isEnrolled ? (
              <Button>Already Enrolled</Button>
            ) : (
              <Button
                onClick={() => handleEnrollCourse(item._id)}
                type="primary"
              >
                Enroll
              </Button>
            )}
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
        dataSource={courseTableData}
        pagination={{ defaultPageSize: 5 }}
      />
    </div>
  );
};

export default OfferedCoures;
