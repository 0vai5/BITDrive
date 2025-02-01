import React, { useEffect, useState } from 'react'
import { FileLogo, Toaster } from '@/components'
import { toast } from 'sonner';

const RecentFiles = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const getFiles = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/file/getUserFiles", {
          withCredentials: true
        });
        setFiles(data);
      } catch (error) {
        toast.error('Failed to fetch files');
      }
    };

    getFiles().catch(err => console.log(err));
  }, []);

  return (
    <div className='h-1/2 w-1/2 bg-white p-4 rounded-md shadow-md'>
      <Toaster />
      <h1 className='text-2xl font-semibold'>Recent Files</h1>
      <div className="flex gap-2 justify-between flex-col items-center">
        {files && files.length > 0 ? (
          files.map((file) => (
            <div key={file.id} className="flex justify-between items-center w-full">
              <div className="flex gap-2 items-center p-2">
                <FileLogo type={file.type} />
                <p className="text-sm">{file.name}</p>
              </div>
              <p className="text-sm">{file.size}</p>
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