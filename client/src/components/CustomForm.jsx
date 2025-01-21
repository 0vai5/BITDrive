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
import { useForm } from "react-hook-form"
import { useState } from "react";
import { loginAction, signupAction } from "@/actions/authActions";
import { Toaster } from "@/components";
import { toast } from "sonner";
import {useNavigate} from "react-router-dom";

const CustomForm = ({ FormType }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register, reset, formState: { errors } } = useForm()
  const authHandler = async data => {
    try {
      setLoading(true);
      if (FormType === "login") {
        const response = await loginAction(data);
      } else {
        const response = await signupAction(data);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
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
                    {...register("name", {
                      required: "Name is Required",
                      minLength: 3
                    })}
                  />
                  {errors.name && <span>{errors.name.message}</span>}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  placeholder="m@example.com"
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Password is Required",
                    minLength: 6
                  })}
                />
                {errors.password && <span>{errors.password.message}</span>}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : FormType === "login" ? "Login" : "SignUp"}
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
