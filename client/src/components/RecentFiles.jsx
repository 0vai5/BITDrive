import React, { useEffect, useState } from 'react'
import { FileLogo, Toaster } from '@/components'
import axios from "axios"
import { toast } from 'sonner';

const RecentFiles = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const getUserFiles = async () => {
      try {

        const {data} = await axios.get("http://localhost:3000/api/v1/file/getUserFiles", {
          withCredentials: true
        });

        // THE LAST 5 FILES

        setFiles(data.data.slice(-5))

      } catch (error) {
        toast.error(error.message);
      }
    };

    getUserFiles()
  }, [])


  return (
    <div className='h-1/2 md:w-2/3 w-full bg-white p-4 rounded-md shadow-md'>
      <Toaster />
      <h1 className='text-2xl font-semibold'>Recent Files</h1>
      <div className="flex gap-2 justify-between flex-col items-center">
        {files && files.length > 0 ? (
          files.map((file) => (
            <div key={file._id} className="flex justify-between items-center w-full">
              <div className="flex gap-2 justify-start items-center p-2">
                <FileLogo type={file.type} />
                <p className="text-sm">{file.name}</p>
              </div>
              <div className='flex justify-end items-center'>
              <p className="text-sm">{file.size}</p>
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