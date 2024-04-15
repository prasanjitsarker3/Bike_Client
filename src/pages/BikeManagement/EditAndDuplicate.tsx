/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateBikeMutation,
  useSingleBikeInfoQuery,
} from "../../redux/features/BikeApi/bikeApi";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Form, Input, Button, Row, Col } from "antd";
import { formatDate } from "../../Utlis/dateFormater";
import { toast } from "sonner";
import { DuplicateSkeletonPage } from "../CustomPage/SkeletonPage";

const EditAndDuplicate = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useSingleBikeInfoQuery({ id });
  const { control, handleSubmit, reset, setValue } = useForm();
  const [createBike] = useCreateBikeMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const bike = data.data;
      console.log("Bike Data", bike);
      setValue("name", bike.name);
      setValue("brand", bike.brand);
      setValue("model", bike.model);
      setValue("type", bike.type);
      setValue("color", bike.color);
      setValue("size", bike.size);
      setValue("price", bike.price);
      setValue("quantity", bike.quantity);
      setValue("releaseDate", formatDate(bike.releaseDate));
    }
  }, [data, setValue]);

  if (isLoading) return <DuplicateSkeletonPage />;
  if (isError) return <div>Error fetching data</div>;

  if (!data)
    return (
      <div className=" text-center text-xl text-blue-600">No data found</div>
    );

  const onSubmit = async (data: FieldValues) => {
    const toatId = toast.loading("Bike Edit & Duplicated Processing...");
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
        // releaseDate: data.releaseDate,
      };
      await createBike(bikeInfo).unwrap();
      toast.success("Bike Edit & Duplicated Successfully", {
        id: toatId,
        duration: 2000,
      });
      reset();
      navigate("/all-bike");
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
          <Col xs={24} sm={24} md={8}>
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

          <Col xs={24} sm={24} md={8}>
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
          <Col xs={24} sm={24} md={8}>
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
          <Col xs={24} sm={24} md={8}>
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
          <Col xs={24} sm={24} md={8}>
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
          <Col xs={24} sm={24} md={8}>
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
            <Form.Item label="Release Date">
              <Controller
                name="releaseDate"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button className=" w-full" type="primary" htmlType="submit">
            Edit And Duplicated
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditAndDuplicate;
