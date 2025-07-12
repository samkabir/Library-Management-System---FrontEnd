import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { closeDeleteModal } from "@/redux/features/deleteBookSlice";
import { useDeleteABookMutation } from "@/redux/api/baseApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DeleteBookModal() {
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(3);
  const { deleteModalOpen, selectedBook } = useSelector(
    (state: RootState) => state.deleteModal
  );

  const [deleteABook, { isLoading, isError, isSuccess }] = useDeleteABookMutation();

  const handleDelete = () => {
    console.log("Deleting book:", selectedBook);
    if (selectedBook) {
      deleteABook(selectedBook.id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book Deleted");
      dispatch(closeDeleteModal());
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to Delete Book");
    }
  }, [isError]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (deleteModalOpen) {
      setCountdown(3);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [deleteModalOpen]);

  return (
    <Dialog open={deleteModalOpen} onOpenChange={() => dispatch(closeDeleteModal())}>
      <DialogContent className="bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-red-500">
            {selectedBook?.title}
          </span>
          ?
        </p>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => dispatch(closeDeleteModal())}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={countdown > 0}>
            {isLoading ? "Deleting..." : countdown > 0 ? `Delete (${countdown}s)` : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}