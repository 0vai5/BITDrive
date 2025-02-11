import React, { useState } from 'react'
import {FileCard} from "@/components";

const OthersPage = () => {
  const [files, setFiles] = useState([]);
  return (
    <main className="bg-white m-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-3">Others</h1>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        {files.length > 0 ? (
          files.map((file, index) => (
            <FileCard key={index} file={file} />
          ))
        ) : (
          <div className="text-gray-400 w-full">No files found for this category</div>
        )}
      </div>
    </main >
  )
}

export default OthersPage