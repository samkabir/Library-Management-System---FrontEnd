import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { closeUpdateModal } from "@/redux/features/updateModalSlice";
import { useUpdateBookMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";

const genres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];

function getChangedFields(original: any, updated: any) {
  const diff: any = {};
  for (const key in updated) {
    let originalValue = original[key];
    let updatedValue = updated[key];

    if (key === 'copies' && typeof updatedValue === 'string') {
      updatedValue = parseInt(updatedValue, 10);
    }

    if (updatedValue !== originalValue) {
      diff[key] = updatedValue;
    }
  }
  return diff;
}

export default function UpdateBookModal() {
  const dispatch = useDispatch();
  const { open, selectedBook } = useSelector((state: RootState) => state.updateModal);
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: selectedBook || {},
  });

  useEffect(() => {
    if (selectedBook) {
      for (const [key, value] of Object.entries(selectedBook)) {
        setValue(key as any, value);
      }
    }
    console.log("Selected book for update:", selectedBook);
  }, [selectedBook, setValue]);

  const onSubmit = async (formData: any) => {
    if (!selectedBook) return;
    console.log("Updating book:", formData);

    const changes = getChangedFields(selectedBook, formData);

    if (Object.keys(changes).length === 0) {
      toast.error("No changes detected");
      return;
    }

    try {
      await updateBook({ id: selectedBook.id, data: changes }).unwrap();
      toast.success("Book Updated Successfully");
      dispatch(closeUpdateModal());
      reset();
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update book");
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => dispatch(closeUpdateModal())}>
      <DialogContent className="bg-white dark:bg-gray-900 max-h-4/5 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "Min 3 characters" },
              })}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              {...register("author", {
                required: "Author is required",
                minLength: { value: 3, message: "Min 3 characters" },
              })}
            />
            {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
          </div>

          <div>
            <Label htmlFor="genre">Genre</Label>
            <Select onValueChange={(val) => setValue("genre", val)} defaultValue={selectedBook?.genre}>
              <SelectTrigger>
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" {...register("genre", { required: "Genre is required" })} />
            {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}
          </div>

          <div>
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              {...register("isbn", {
                required: "ISBN is required",
                pattern: {
                  value: /^(97(8|9))?\d{9}(\d|X)$/,
                  message: "Invalid ISBN format",
                },
              })}
            />
            {errors.isbn && <p className="text-red-500 text-sm">{errors.isbn.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
          </div>

          <div>
            <Label htmlFor="copies">Copies</Label>
            <Input
              type="number"
              id="copies"
              {...register("copies", {
                required: "Number of copies is required",
                min: { value: 0, message: "Cannot be a negative number" },
                valueAsNumber: true,
              })}
            />
            {errors.copies && <p className="text-red-500 text-sm">{errors.copies.message}</p>}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


