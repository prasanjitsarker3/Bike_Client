import { useGetAllEnrollCOurseQuery } from "../../redux/features/ManagerManagement/managerBikeApi";
import { Table, TableColumnsType } from "antd";

const EnrollCourse = () => {
  const { data: enrollCourseData, isFetching } =
    useGetAllEnrollCOurseQuery(undefined);
  console.log(enrollCourseData?.data);

  const courseTableData = enrollCourseData?.data?.map(
    ({ _id, name, email, course }: any) => ({
      key: _id,
      _id,
      name,
      email,
      course: course.title,
      enroll: course.enroll,
    })
  );

  const columns: TableColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Course Name",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Enroll",
      dataIndex: "enroll",
      key: "enroll",
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

export default EnrollCourse;
