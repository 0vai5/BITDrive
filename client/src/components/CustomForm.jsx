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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomForm = ({ FormType }) => {
  const navigate = useNavigate();
  const authHandler = async (formData) => {
    const data = Object.fromEntries(formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        data,
        {
          withCredentials: true,
        }
      );
      navigate("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col mt-8">
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
          <form action={authHandler}>
            <div className="flex flex-col gap-6">
              {FormType === "signup" && (
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={false}>
                {FormType === "login" ? "Login" : "SignUp"}
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
