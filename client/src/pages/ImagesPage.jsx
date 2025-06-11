import React, { useEffect, useState } from "react";
import { FileCard, Toaster } from "@/components";
import { toast } from "sonner";
import axios from "axios";

const ImagesPage = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/v1/file/getFileByCategory/image",
          {
            withCredentials: true,
          }
        );

        console.log(data, "data");

        setFiles(data.data);

        if (data.data.length <= 0) {
          toast.success("No Files found for this category");
          return;
        }
        toast.success(data.message);
      } catch (error) {
        toast.error("Failed to fetch files");
      }
    };

    fetchFiles();
  }, []);
  return (
    <main className="bg-white m-10">
      <Toaster />
      <h1 className="text-3xl font-semibold text-gray-800 mb-3">Images</h1>
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

export default ImagesPage;
