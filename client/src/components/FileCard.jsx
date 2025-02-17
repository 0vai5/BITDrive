import react from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FileLogo,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DeleteDialog,
  RenameDialog
} from "@/components";
import { EllipsisVertical, PencilIcon, Trash } from "lucide-react";

const FileCard = ({ file }) => {
  const formattedDate = new Date(file.createdAt).toLocaleDateString();



  return (
    <Card className="flex justify-between flex-col ">
      <CardHeader>
        <div className="flex justify-between items-center gap-3">
          <div className="flex gap-3 items-center">
            <FileLogo type={file.type} />
            <CardTitle>{file.name}</CardTitle>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical size={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <DeleteDialog id={file._id}/>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RenameDialog rename={file.name} id={file._id}/>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <h1>{file.size}</h1>
          <span>{formattedDate}</span>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default FileCard;
