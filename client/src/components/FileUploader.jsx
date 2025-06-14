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
import { UploadCloud } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import { setIsUpdating } from "@/features/global/globalSlice";
import { useDispatch, useSelector } from "react-redux";

const FileUploader = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const isUpdating = useSelector((state) => state.global.isUpdating);
  const dispatch = useDispatch();

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
      dispatch(setIsUpdating(!isUpdating));
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "File upload failed");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Toaster />
      <DialogTrigger asChild>
        <button
         className="fixed bottom-6 right-6 z-[9999] bg-[#C7483B] hover:bg-[#C44B3A] text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          title="Upload File"
        >
          <UploadCloud size={24} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>File Upload</DialogTitle>
          <DialogDescription>
            Upload Your File to the BITDrive Cloud.
          </DialogDescription>
        </DialogHeader>
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
          <div className="flex justify-end mt-4">
            <Button type="submit" disabled={loading}>
              {loading ? <MoonLoader size={20} color="black" /> : "Upload"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploader;
