import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '.'

const SharedFileCard = ({file}) => {
  return (
   <Card>
    <CardHeader>
        <CardTitle className="text-lg font-semibold">{file.fileDetails.name}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
            Shared by: {file.senderDetails.name}
        </CardDescription>
    </CardHeader>
    <CardContent>
        <div className="text-sm text-gray-700">
            <p>File Type: {file.fileDetails.type}</p>
            <p>Size: {file.fileDetails.size}</p>
            <p>Shared On: {new Date(file.createdAt).toLocaleDateString()}</p>
        </div>
    </CardContent>
   </Card>
  )
}

export default SharedFileCard