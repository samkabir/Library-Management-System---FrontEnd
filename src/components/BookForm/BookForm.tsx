import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import type { IBook } from "@/types";



const genres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];


export default function BookForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<IBook>();

  const [createBook, { isLoading, isError, isSuccess }] = useCreateBookMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: IBook) => {
    const payload = {
      ...data,
      available: true,
    };
    try {
      await createBook(payload).unwrap();
      toast.success("Book Created Successfully");
      reset();
      navigate("/");
    } catch (err) {
      console.error("Create failed", err);
      toast.error("Failed to create book");
    }
  };
  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-4xl mx-auto p-6  rounded-xl shadow"
      >
     
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 3, message: "Title must be at least 3 characters" },
            })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

     
        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            {...register("author", {
              required: "Author is required",
              minLength: { value: 3, message: "Author name must be at least 3 characters" },
            })}
          />
          {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
        </div>

        
        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Select onValueChange={(value) => setValue("genre", value)} defaultValue="">
            <SelectTrigger id="genre" className="w-full">
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
          <SelectItem key={genre} value={genre}>
            {genre}
          </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}
        </div>

       
        <input type="hidden" {...register("genre", { required: "Genre is required" })} />

      
        <div className="space-y-2">
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

       
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
        </div>

       
        <div className="space-y-2">
          <Label htmlFor="copies">Copies</Label>
          <Input
            type="number"
            id="copies"
            {...register("copies", {
              required: "Number of copies is required",
              min: { value: 1, message: "At least 1 copy is required" },
            })}
          />
          {errors.copies && <p className="text-red-500 text-sm">{errors.copies.message}</p>}
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Book"}
        </Button>

      </form>


      {isSuccess && <p className="text-green-500 text-sm">Book added successfully!</p>}
      {isError && <p className="text-red-500 text-sm">Error submitting book.</p>}
    </div>
  )
}