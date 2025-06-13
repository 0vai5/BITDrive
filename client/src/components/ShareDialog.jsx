import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Button,
  Label,
  Input,
} from "@/components";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MoonLoader } from "react-spinners";

const ShareDialog = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const handleShare = async (form) => {
    setLoading(true);


    try {
      const { data } = await axios.post("http://localhost:3000/api/v1/shareFile/share", {
        fileID: id,
        email: form.email.trim(),
      }, {
        withCredentials: true,
      });

      console.log(data.data);
      toast.success("File shared successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <>
      <button onClick={handleOpen}>Share</button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            share the file to your loved ones. <span className="text-red-400">One File At a time.</span>
          </DialogDescription>
          <form onSubmit={handleSubmit(handleShare)}>
            <Label htmlFor="rename">Emails</Label>
            <Input
              type="text"
              {...register("email", { required: true })}
            />
            <Button
              variant={"default"}
              disabled={loading}
              type="submit"
              className={"mt-4"}
            >
              {loading ? <MoonLoader size={20} color="black" /> : "Share"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareDialog;
