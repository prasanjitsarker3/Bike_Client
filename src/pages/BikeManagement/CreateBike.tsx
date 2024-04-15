import { Form, Input, Button, Row, Col } from "antd";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useCreateBikeMutation } from "../../redux/features/BikeApi/bikeApi";
import { toast } from "sonner";

const CreateBike = () => {
  const { control, handleSubmit, reset } = useForm();
  const [createBike] = useCreateBikeMutation();

  const onSubmit = async (data: FieldValues) => {
    const toatId = toast.loading("Create Bike Processing...");
    try {
      const bikeInfo = {
        name: data.name,
        brand: data.brand,
        model: data.model,
        type: data.type,
        color: data.color,
        size: data.size,
        price: parseInt(data.price),
        quantity: parseInt(data.quantity),
        releaseDate: data.releaseDate,
      };
      const res = await createBike(bikeInfo).unwrap();
      toast.success("Bike Create Successfully", { id: toatId, duration: 2000 });
      reset();
      console.log(res);
    } catch (err: any) {
      console.error("Message", err.data.errorSources[0].message);
      const errorMessage =
        err.data.errorSources[0].message || "An error occurred";
      toast.error(errorMessage, { id: toatId, duration: 2000 });
    }
  };

  return (
    <div>
      <Form
        onFinish={handleSubmit(onSubmit)}
        name="form_item_path"
        layout="vertical"
        className=" md:px-24"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item name="name" label="Bike Name">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input {...field} placeholder="Enter Bike Name..." />
                )}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item name="brand" label="Bike Brand">
              <Controller
                name="brand"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter Bike Brand"
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="model" label="Bike Model">
              <Controller
                name="model"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter Bike Model..."
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="type" label="Bike Type">
              <Controller
                name="type"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter Bike Type..."
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="color" label="Bike Color">
              <Controller
                name="color"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter Bike Color..."
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="size" label="Bike Size">
              <Controller
                name="size"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter Bike Size..."
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item name="price" label="Bike Price">
              <Controller
                name="price"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter Bike Price..."
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item name="quantity" label="Bike Quantity">
              <Controller
                name="quantity"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter Bike Quantity..."
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item name="releaseDate" label="Release Date">
              <Controller
                name="releaseDate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    placeholder="Enter Release Date..."
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button className=" w-full" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBike;
