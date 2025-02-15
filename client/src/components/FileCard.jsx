import react from "react";
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, FileLogo, DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components"
import { EllipsisVertical, PencilIcon, Trash } from "lucide-react"

const FileCard = ({
    file
}) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center gap-3">
                    <div className="flex gap-3 items-center">
                        <FileLogo type={file.type} />
                        <CardTitle>{file.name}</CardTitle>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger><EllipsisVertical size={24} /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><PencilIcon /> Update</DropdownMenuItem>
                            <DropdownMenuItem><Trash />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    <h1>{file.size}</h1>
                    <span>{file.createdAt}</span>
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default FileCard