import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FileLogo,
} from ".";
import { format, formatDistanceToNow } from "date-fns";

const SharedFileCard = ({ file }) => {
  const { fileDetails, senderDetails, createdAt } = file;

  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <FileLogo type={fileDetails.type} />
          <CardTitle className="text-base font-semibold">
            {fileDetails.name}
          </CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          Shared by: {senderDetails.name}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col text-sm text-gray-700 gap-1">
          <p className="capitalize">Type: {fileDetails.type}</p>
          <p>Size: {fileDetails.size}</p>
          <p>Date: {formatDistanceToNow(new Date(file.createdAt), { addSuffix: true })}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SharedFileCard;
