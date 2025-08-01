import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from ".";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginAction, signupAction } from "@/actions/authActions";
import { Toaster } from "@/components";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import {
  setIsLoading,
  setUser,
  setIsLoggedIn,
} from "../features/global/globalSlice";
import Cookies from "js-cookie";

const CustomForm = ({ FormType }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  const authHandler = async (data) => {
    try {
      setLoading(true);
      if (FormType === "login") {
        const response = await loginAction(data);


        toast.success(response.message);

        if (response.status !== 200) {
          throw new Error(response.message || "Login failed");
        }

        dispatch(setUser(response.data));
        dispatch(setIsLoggedIn(true));

        Cookies.set("token", response.token);

        navigate("/");
      } else {
        const response = await signupAction(data);

        if (response.status !== 201) {
          throw new Error(response.message || "Signup failed");
        }

        toast.success(response.message);
        navigate("/login");
      }
      reset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setIsLoading(false));
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col mt-8">
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {FormType === "login" ? "Login" : "SignUp"}
          </CardTitle>
          <CardDescription>
            Enter your email below to{" "}
            {FormType === "login" ? "login to your" : "create new"} account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(authHandler)}>
            <div className="flex flex-col gap-6">
              {FormType === "signup" && (
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    className={`${errors.name ? "border-red-500" : ""}`}
                    {...register("name", {
                      required: "Name is Required",
                      minLength: 3,
                    })}
                  />
                  {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                  )}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  placeholder="m@example.com"
                  className={`${errors.email ? "border-red-500" : ""}`}
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  className={`${errors.password ? "border-red-500" : ""}`}
                  {...register("password", {
                    required: "Password is Required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <MoonLoader size={20} color="black" />
                ) : FormType === "login" ? (
                  "Login"
                ) : (
                  "SignUp"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="mt-2 text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

CustomForm.propTypes = {
  FormType: PropTypes.string.isRequired,
};

export default CustomForm;
