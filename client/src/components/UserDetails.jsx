import React from "react";
import { useSelector } from "react-redux";
import { Progress } from ".";

const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getUserInitials = (name = "") => {
  if (!name.trim()) return "";

  return name.trim().split(/\s+/).map((word) => word[0].toUpperCase()).slice(0, 2).join('');
};

const UserCard = () => {
  const user = useSelector((state) => state.global.user) ||
    { name: "", email: "", storage: 0 };
  const totalBytes = 5368709120;
  const usagePercent = Math.min(Math.round((user.storage / totalBytes) * 100), 100); // Ensure usagePercent does not exceed 100

  return (
    <div className="bg-gray-50 shadow-md rounded-lg p-5 w-full">
      <div className="flex items-center gap-4 mb-4">
        <div aria-label="User initials" className="bg-gray-900 rounded-full w-12 h-12 flex items-center justify-center text-gray-50 text-lg font-semibold">
          {getUserInitials(user.name)}
        </div>
        <div className="flex flex-col">
          <p aria-label="User name" className="text-gray-900 font-semibold">
            {user.name}
          </p>
          <p aria-label="User email" className="text-gray-500 text-sm">
            {user.email}
          </p>
        </div>
      </div>

      <div aria-label="Storage usage" role="progressbar" aria-valuenow={usagePercent} aria-valuemin="0" aria-valuemax="100">
        <p aria-label="Storage usage in bytes" className="text-sm text-gray-600 mb-1">
          {formatBytes(user.storage)} of {formatBytes(totalBytes)} used
          <span aria-hidden="false" className="sr-only">
            Storage usage is at {usagePercent}%
          </span>
        </p>

        <div className="bg-gray-300 rounded-full h-4 shadow-md">
          <Progress
            value={usagePercent}
            aria-label="Storage usage percentage"
            aria-valuenow={usagePercent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="bg-[#FECACA] transition-all duration-500 ease-in-out h-4 rounded-full"
          />
        </div>

        <div aria-label="Legend" className="flex justify-start items-center mt-2 gap-4 text-gray-600">
          <div aria-label="Storage used" className="flex items-center gap-2">
            <div className="bg-[#DB254E] rounded-full h-2 w-2"></div>
            <span className="text-xs">Storage Used</span>
          </div>
          <div aria-label="Storage available" className="flex items-center gap-2">
            <div className="bg-[#FECACA] rounded-full h-2 w-2"></div>
            <span className="text-xs">Storage Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
