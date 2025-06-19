import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  RenameDialog,
  Button,
} from "@/components";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setIsUpdating } from "@/features/global/globalSlice";

const OptionDialog = ({ rename, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isUpdating = useSelector((state) => state.global.isUpdating);
  const dispatch = useDispatch();

  const handleOpen = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const handleDeletion = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/file/deleteFile/${id}`,
        {
          withCredentials: true,
        }
      );

      setIsOpen(false);
      toast.success(data.message);

      dispatch(setIsUpdating(!isUpdating));
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Deletion failed");
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button onClick={handleOpen}>Delete</button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this item?
        </DialogDescription>
        <Button
          variant={"destructive"}
          disabled={loading}
          onClick={handleDeletion}
        >
          {loading ? "Deleting" : "Delete"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default OptionDialog;
