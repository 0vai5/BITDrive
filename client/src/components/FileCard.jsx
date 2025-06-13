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
  RenameDialog,
  ShareDialog,
} from "@/components";
import { Download, EllipsisVertical, PencilIcon, PenSquare, Share2, Trash } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const FileCard = ({ file }) => {
  const formattedDate = formatDistanceToNow(new Date(file.createdAt), { addSuffix: true })

  return (
    <Card className="flex justify-between flex-col overflow-hidden shadow-md border-2 border-gray-200 hover:shadow-lg transition-shadow duration-300 ease-in-out w-full">
      <CardHeader>
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-2 items-center">
            <FileLogo type={file.type} />
            <CardTitle>{file.name.substring(0, 20)}...</CardTitle>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="ml-2">
              <EllipsisVertical size={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="flex items-center">
                <Trash color="#C7483B" fontWeight={800} />
                <DeleteDialog id={file._id} />
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center">
                <PenSquare color="#C7483B" fontWeight={800} />
                <RenameDialog rename={file.name} id={file._id} />
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center">
                <Share2 color="#C7483B" fontWeight={800} />
                <ShareDialog id={file._id} />
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
