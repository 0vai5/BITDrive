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

const CustomForm = ({ FormType }) => {
  return (
    <div className="flex justify-center items-center mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {FormType == "login" ? "Login" : "SignUp"}
          </CardTitle>
          <CardDescription>
            Enter your email below to{" "}
            {FormType == "login" ? "login to your account" : "create new"}{" "}
            account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {FormType == "signup" && (
                <div className="grid gap-2">
                  <Label htmlFor="email">Name</Label>
                  <Input
                    id="name"
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
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                {FormType == "login" ? "Login" : "SignUp"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
CustomForm.propTypes = {
  FormType: PropTypes.string.isRequired,
};

export default CustomForm;
