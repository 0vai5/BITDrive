import { Button, CustomForm } from "@/components";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <main className="h-screen overflow-hidden">
      <div className="loginHeader flex justify-end p-5 items-center">
        <Link to={"/login"}>
          <Button>Login</Button>
        </Link>
      </div>
      <div className="flex justify-center items-center mt-12">
        <CustomForm FormType={"signup"} />
      </div>
    </main>
  );
};

export default SignupPage;
