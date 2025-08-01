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
import { useDispatch, useSelector } from "react-redux";
import { setIsUpdating } from "@/features/global/globalSlice";
import Cookies from "js-cookie";
import { LoaderCircle } from "lucide-react";

const ShareDialog = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isUpdating = useSelector((state) => state.global.isUpdating);
  const token = Cookies.get("token");

  const handleOpen = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const handleShare = async (form) => {
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/shareFile/share`,
        {
          fileID: id,
          email: form.email.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("File shared successfully");
      dispatch(setIsUpdating(!isUpdating));
    } catch (error) {
      toast.error(error.response?.data?.message || "Sharing failed");
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
            share the file to your loved ones.{" "}
            <span className="text-red-400">One File At a time.</span>
          </DialogDescription>
          <form onSubmit={handleSubmit(handleShare)}>
            <Label htmlFor="rename">Emails</Label>
            <Input type="text" {...register("email", { required: true })} />
            <Button
              variant={"default"}
              disabled={loading}
              type="submit"
              className={"mt-4"}
            >
              {loading ? (
                <LoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                "Share"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareDialog;
