import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  Button,
  Toaster,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  DialogTitle,
  Input,
  Label,
} from "@/components";
import { MoonIcon, UploadCloud } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { MoonLoader } from "react-spinners";

const FileUploader = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fileSubmission = async (data) => {
    setOpen(true);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", data.file[0]);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/file/createFile",
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success("File Uploaded Successfully!");
      reset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Toaster />
      <DialogTrigger className="bg-slate-800 rounded-lg text-white p-2 w-full flex justify-center gap-4 items-center">
        <UploadCloud size={24} />
        Upload File
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>File Upload</DialogTitle>
          <DialogDescription>
            Upload Your File to the BITDrive Cloud.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form
            onSubmit={handleSubmit(fileSubmission)}
            encType="multipart/form-data"
          >
            <Label>File</Label>
            <Input
              type="file"
              className={`${
                errors.file ? "border-red-500" : ""
              } w-full p-2 border-2 rounded-lg`}
              {...register("file", { required: "This field is required" })}
            />
            {errors.file && (
              <span className="text-red-500">{errors.file.message}</span>
            )}
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? <MoonLoader  size={20} color="black" /> : "Upload"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploader;
