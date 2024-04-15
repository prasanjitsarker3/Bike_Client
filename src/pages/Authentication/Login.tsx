import { Button, Input } from "antd";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { verifyToken } from "../../Utlis/verifyToken";
import { TUser, setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hook";
import backVideo from "../../../public/video.mp4";

const Login = () => {
  const { control, handleSubmit } = useForm();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Login processing...");
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      console.log("error:", res);
      const user = verifyToken(res.data) as TUser;
      console.log("Check Here", user);
      dispatch(setUser({ user: user, token: res.data }));
      toast.success("Login Successful", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
      console.log(res);
    } catch (err: any) {
      console.log(err.data.message);
      toast.error(err.data.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="h-screen relative overflow-hidden m-0 p-0 w-full">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0 brightness-50"
        src={backVideo}
      />

      <div className="relative z-10 flex flex-col text-white justify-center items-center h-full w-full brightness-100">
        {/* md:w-1/3 mx-auto h-100vh  p-5 */}
        <h1 className=" text-center text-md text-white">Please Login Here !</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" space-y-6 flex flex-col  md:w-1/3 w-1/2 border"
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input {...field} placeholder="Enter Email..." size="large" />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Enter Password..."
                size="large"
              />
            )}
          />
          <Button
            size="large"
            className=" w-full bg-blue-600 border-none text-white py-1 font-bold"
            htmlType="submit"
          >
            Login
          </Button>
        </form>
        <p className="text-lg text-white">
          New to our platform?{" "}
          <Link to="/register" className="no-underline text-blue-800">
            Create an account sign up
          </Link>{" "}
          now.
        </p>
      </div>
    </div>
  );
};

export default Login;
