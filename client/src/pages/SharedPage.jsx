import React, { useEffect, useState } from "react";
import { Toaster, FileCard, FileLogo, SharedFileCard } from "@/components";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const SharedPage = () => {
  const [files, setFiles] = useState([]);

  const user = useSelector((state) => state.global.user);

  const fetchSharedFiles = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/shareFile/getSharedFiles/${user._id}`,
        {
          withCredentials: true,
        }
      );

      setFiles(data.data);

      if (data.data.length <= 0) {
        toast.success("No Files found for this category");
        return;
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchSharedFiles();
  }, []);
  return (
    <main className="bg-white m-10">
      <Toaster />
      <h1 className="text-3xl font-semibold text-gray-800 mb-3">
        Shared With Me
      </h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {files.length > 0 ? (
          files.map((file, index) => <SharedFileCard key={index} file={file} />)
        ) : (
          <div className="text-gray-400 w-full">
            No files found for this category
          </div>
        )}
      </div>
    </main>
  );
};

export default SharedPage;
