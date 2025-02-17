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

const OptionDialog = ({ rename, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const handleDeletion = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `http://localhost:3000/api/v1/file/deleteFile/${id}`,
        {
          withCredentials: true,
        }
      );

      console.log(data);

      setIsOpen(false);
      toast.success(data.message);

      window.location.reload();

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
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
