import React, { useState, useEffect } from "react";
import { FileCard, Toaster } from "@/components";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const AudioPage = () => {
  const [files, setFiles] = useState([]);
  const isUpdating = useSelector((state) => state.global.isUpdating);
  const token = Cookies.get("token");

  const fetchFiles = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/file/getFilesByCategory/audio`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      setFiles(data.data);

      if (data.data.length <= 0) {
        toast.success("No Files found for this category");
        return;
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch files");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [isUpdating]);

  return (
    <main className="bg-white m-10">
      <Toaster />
      <h1 className="text-3xl font-semibold text-gray-800 mb-3">Audios</h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {files.length > 0 ? (
          files.map((file, index) => <FileCard key={index} file={file} />)
        ) : (
          <div className="text-gray-400 w-full">
            No files found for this category
          </div>
        )}
      </div>
    </main>
  );
};

export default AudioPage;
