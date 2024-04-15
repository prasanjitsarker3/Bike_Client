import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useCreateBikeCourseMutation } from "../../redux/features/ManagerManagement/managerBikeApi";
import { toast } from "sonner";

const CreateBikeCourse = () => {
  const { control, handleSubmit, reset } = useForm();
  const [createCourse] = useCreateBikeCourseMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Created Course Processing");
    try {
      const courseData = {
        ...data,
        duration: Number(data.duration),
        maxParticipants: Number(data.maxParticipants),
      };

      const res = await createCourse(courseData);
      console.log(res);
      reset();
      toast.success("Created Course Successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (err: any) {
      console.error("Message", err.data.errorSources[0].message);
      const errorMessage =
        err.data.errorSources[0].message || "An error occurred";
      toast.error(errorMessage, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className=" px-12">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label="Course Title">
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter here..."
                    className="w-full"
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label="Instructor Name">
              <Controller
                name="instructor"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter here..."
                    className="w-full"
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label="Course Difficulty">
              <Controller
                name="difficulty"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter here..."
                    className="w-full"
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label="Course Start Date">
              <Controller
                name="startDate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    placeholder="Enter here..."
                    className="w-full"
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label="Course Duration">
              <Controller
                name="duration"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter here..."
                    className="w-full"
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label="Course Max Participants">
              <Controller
                name="maxParticipants"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter here..."
                    className="w-full"
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label="location">
              <Controller
                name="location"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter here..."
                    className="w-full"
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item label="Course Description">
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextArea
                    {...field}
                    placeholder="Enter here..."
                    className="w-full"
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-center items-center">
          <Button type="primary" className=" w-1/2 " htmlType="submit">
            Create Course
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateBikeCourse;
