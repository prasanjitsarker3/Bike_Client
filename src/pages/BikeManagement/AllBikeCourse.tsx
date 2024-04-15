import { Button, Space, Table, TableColumnsType } from "antd";
import {
  useAllBikeCourseQuery,
  useDeleteBikeCourseMutation,
} from "../../redux/features/ManagerManagement/managerBikeApi";
import moment from "moment";
import { toast } from "sonner";

const AllBikeCourse = () => {
  const { data: bikeCourseData, isFetching } = useAllBikeCourseQuery(undefined);
  console.log(bikeCourseData?.data);
  const [deleteCourse] = useDeleteBikeCourseMutation();

  const courseTableData = bikeCourseData?.data?.map(
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

  const handleDeleteCourse = async (id: any) => {
    try {
      await deleteCourse(id);
      toast.success("Deleted Successfully");
    } catch (err: any) {
      console.log(err);
      toast.error("Something went wrong");
    }
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
      title: "Enroll",
      dataIndex: "enroll",
      key: "enroll",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Button
              onClick={() => handleDeleteCourse(item._id)}
              type="primary"
              danger
            >
              Delete
            </Button>
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

export default AllBikeCourse;
