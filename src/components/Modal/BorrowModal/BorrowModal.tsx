import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Calendar } from "@/components/ui/calendar";
import { useForm, Controller } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { closeBorrowModal } from "@/redux/features/borrowBookSlice";
import { useEffect } from "react";
import { useCreateBorrowMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import type { BookSummary, FormValues } from "@/types";



export default function BorrowModal() {
  const dispatch = useDispatch();
  

  const { open, selectedBook } = useSelector(
    (state: RootState) => state.borrowModal
  ) as { open: boolean; selectedBook: BookSummary | null };

  const [updateBook, { isLoading }] = useCreateBorrowMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      quantity: 1,
      dueDate: undefined,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      reset({ quantity: 1, dueDate: undefined });
    }
  }, [open, reset]);

  const onSubmit = async (data: FormValues) => {
    if (!selectedBook) return;
    await updateBook({
      book: selectedBook.id,
      quantity: data.quantity,
      dueDate: data.dueDate,
    })
      .unwrap()
      .then(() => {
        toast.success("Book Borrowed Successfully");
        reset();
        navigate("/BorrowSummary");

      })
      .catch((err) => {
        console.error("Borrow failed", err);
        toast.error("Failed to borrow book");
      });

    dispatch(closeBorrowModal());
  };

  return (
    <Dialog open={open} onOpenChange={() => dispatch(closeBorrowModal())}>
      <DialogContent className="bg-white dark:bg-gray-900 max-h-4/5 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="">
            <h1 className="text-white text-2xl mb-2">{selectedBook?.title}</h1>
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "At least 1" },
                max: { value: selectedBook?.copies || 1, message: `Max ${selectedBook?.copies || 1}` },
                valueAsNumber: true,
              })}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Controller
              control={control}
              name="dueDate"
              rules={{
                required: "Due date is required",
                validate: (value) => {
                  if (!value) return "Due date is required";
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const selected = new Date(value);
                  selected.setHours(0, 0, 0, 0);
                  if (selected <= today) {
                    return "Due date must be a future date";
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  className="rounded-md border p-1"
                />
              )}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">{isLoading ? "Borrowing..." : "Borrow"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
