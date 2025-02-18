import { Toaster } from "@/components";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex justify-center h-screen overflow-visible md:overflow-hidden">
      <div className="w-1/2 bg-red-200 hidden md:flex justify-between flex-col p-5 ">
      <Toaster />
        <div>
          <div className="layoutHead p-5">
            <img
              src="/logo-transparent.png"
              height={125}
              width={150}
              alt="BITDrive Logo"
            />
          </div>
          <div className="p-4 ">
            <h1 className="text-[2.5rem] leading-10 font-bold">
              Manage Your Files the Best Way
            </h1>
            <p className="mt-2 text-lg font-semibold text-gray-600">
              This is a place where you can store all your documents.
            </p>
          </div>
        </div>
        <div className="self-end p-4">
          <p className="text-lg font-medium text-gray-600">
            “Information is power, but only if you can access it easily - so
            store your files wisely.”
          </p>
          <p className="mt-2 text-lg font-semibold text-black">- BITDrive</p>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
