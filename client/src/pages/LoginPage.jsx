import React, { useEffect } from "react";
import { Button, CustomForm } from "@/components";
import { Link } from "react-router-dom";

const LoginPage = () => {

  return (
    <main className="h-screen overflow-hidden">
      <div className="loginHeader flex md:justify-end justify-between pt-5 px-5 items-center">
        <div className="md:hidden block">
          <img src="/logo-transparent.png" height={100} width={100} alt="" />
        </div>
        <Link to={"/signup"}>
          <Button>SignUp</Button>
        </Link>
      </div>
      <div className="flex justify-center items-center mt-12">
        <CustomForm FormType={"login"} />
      </div>
    </main>
  );
};

export default LoginPage;
