import React from "react";
import { useSelector } from "react-redux";
import { Separator } from ".";

const UserDetails = () => {
  const user = useSelector((state) => state.global.user);

  const getUserInitials = (name = "") => {
    if (!name.trim()) return "";

    const nameArr = name.trim().split(/\s+/);
    const firstLetters = nameArr.map((word) => word[0].toUpperCase());

    return firstLetters.slice(0, 2).join("");
  };

  return (
    <>
      <Separator className={"bg-gray-500 rounded-md"} />
      <div className="flex items-center gap-2 p-2">
       <div className="bg-slate-800 rounded-full w-10 h-10 flex items-center justify-center">
            <p className="text-white">{getUserInitials(user.name)}</p>
       </div>
        <div className="flex flex-col items-start justify-center">
          <p className="text-gray-800 font-semibold">{user.name}</p>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
