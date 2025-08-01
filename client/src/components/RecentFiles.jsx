import React, { useEffect, useState } from "react";
import { FileLogo, Toaster } from "@/components";
import axios from "axios";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const RecentFiles = () => {
  const [files, setFiles] = useState([]);
  const isUpdating = useSelector((state) => state.global.isUpdating);
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  const getUserFiles = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/file/getUserFiles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // THE LAST 5 FILES

      setFiles(data.data.slice(-5));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch files");
    }
  };
  useEffect(() => {
    getUserFiles();
  }, [isUpdating]);

  return (
    <div className="h-1/2 w-full bg-white p-4 rounded-md shadow-md">
      <Toaster />
      <h1 className="text-2xl font-semibold mb-1">Recent Files</h1>
      <div className="flex gap-2 justify-between w-full flex-col items-center">
        {files && files.length > 0 ? (
          files.map((file) => (
            <div
              key={file._id}
              className="flex justify-between hover:-translate-y-1 items-center w-full px-3 py-2 border rounded-md hover:shadow-sm transition"
            >
              <div className="flex items-center gap-3 w-1/2">
                <FileLogo type={file.type} />
                <div className="flex flex-col truncate">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(file.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end text-sm">
                <span className="text-gray-700">{file.size}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {file.type.toUpperCase()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm">No recent files found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentFiles;
