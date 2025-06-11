import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  Button,
  Label,
  Input,
} from "@/components";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const RenameDialog = ({ rename, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState(rename);

  useEffect(() => {
    setNewName(rename);
  }, [rename]);

  const handleOpen = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const handleRename = async (form) => {
    if (rename === form.name) {
      toast.error("Please enter a new name");
      return;
    }

    const extention = rename.split(".");
    const updatedName = `${form.name}.${extention[1]}`;

    try {
      setLoading(true);
      const { data } = await axios.patch(
        `http://localhost:3000/api/v1/file/updateFile/${id}`,
        {
          name: updatedName,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);

      setLoading(false);
      setIsOpen(false);

      setNewName("");
      window.location.reload();
    } catch (error) {
      console.error(error.message);
      setLoading(false);
      toast.error(error.message);
    }
  };

  const { formState, register, handleSubmit } = useForm();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button onClick={handleOpen}>Rename</button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Rename</DialogTitle>
        <DialogDescription>
          Are you sure you want to rename this item?
        </DialogDescription>
        <form onSubmit={handleSubmit(handleRename)}>
          <Label htmlFor="rename">Rename</Label>
          <Input
            type="text"
            {...register("name", { required: true })}
            // value={newName}
            // onChange={(e) => setNewName(e.target.value)}
          />
          <Button
            variant={"destructive"}
            disabled={loading}
            type="submit"
            className={"mt-4"}
          >
            {loading ? "Renaming" : "Rename"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
