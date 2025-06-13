import React from "react";
import { UserDetails } from ".";

const TotalStorage = () => {
  return (
    <div className="h-1/2 md:w-1/2 w-full bg-white">
      <div className="flex justify-center flex-col gap-2 items-center mt-4">
        <UserDetails />
      </div>
    </div>
  );
};

export default TotalStorage;
