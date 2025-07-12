import { useEffect } from "react";
import { useGetAllBooksQuery } from "@/redux/api/baseApi";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { openDeleteModal } from "@/redux/features/deleteBookSlice";
import { useDispatch } from "react-redux";
import DeleteBookModal from "@/components/Modal/DeleteModal/DeleteModal";

import { openUpdateModal } from "@/redux/features/updateModalSlice";
import UpdateBookModal from "@/components/Modal/UpdateModal/UpdateModal";

import { openBorrowModal } from "@/redux/features/borrowBookSlice";
import BorrowModal from "@/components/Modal/BorrowModal/BorrowModal";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import type { Book } from "@/types";
import TableSkeleton from "@/components/Skeleton/SkeletonTable";

export default function AllBooks() {
  const { data: books = [], isLoading, isError, isSuccess } = useGetAllBooksQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: true,
    refetchOnFocus: false,
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSingleClick = (book: any) => {
    console.log("Book clicked:", book);
    navigate(`/books/${book._id}`);
  };

  useEffect(() => {
    if (isSuccess && books?.data?.length) {
      toast.success("Books Loaded");
    }
    if (isError) {
      toast.error("Error loading books");
    }
  }, [isSuccess, isError, books]);

  if (isLoading) {
    return <div className="p-4">
      <h1 className="text-white text-4xl mb-4">All Books</h1>
      <TableSkeleton
        rows={8}
        columns={7}
        showHeader={true}
        showActionColumn={true}
        headerLabels={["Title", "Author", "Genre", "ISBN", "Copies", "Availability", "Actions"]}
        columnWidths={["w-1/3", "w-1/4", "w-1/6", "w-1/6", "w-1/6", "w-1/6", "w-20"]}
      />
    </div>;
  }

  if (isError) {
    return <div className="text-red-500 text-2xl">Error loading books</div>;
  }


  return (
    <div className="p-4 mb-10">
      <h1 className="text-white text-4xl mb-4">All Books</h1>
      <div className="rounded-md border border-gray-600 overflow-x-auto">
        <Table>
            <TableHeader>
            <TableRow className="h-12 bg-gray-200 dark:bg-gray-800">
              <TableHead className="text-lg font-bold text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800">Title</TableHead>
              <TableHead className="text-lg font-bold text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800">Author</TableHead>
              <TableHead className="text-lg font-bold text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800">Genre</TableHead>
              <TableHead className="text-lg font-bold text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800">ISBN</TableHead>
              <TableHead className="text-lg font-bold text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800">Copies</TableHead>
              <TableHead className="text-lg font-bold text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800">Availability</TableHead>
              <TableHead className="text-lg font-bold text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800">Actions</TableHead>
            </TableRow>
            </TableHeader>

          <TableBody>
            {books.data.map((book: Book, index: number) => (
              <TableRow key={index} onClick={(e) => {
                e.stopPropagation();
                handleSingleClick(book)
              }} className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>
                  {book.available ? (
                    <span className="text-green-500">Available</span>
                  ) : (
                    <span className="text-red-500">Not Available</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      dispatch(openUpdateModal({ ...book, id: book._id }));
                    }

                    }>
                      Edit Book
                    </Button>
                    <Button variant="destructive" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      dispatch(openDeleteModal({ ...book, id: book._id }))
                    }}>
                      Delete Book
                    </Button>
                    <Button variant="secondary" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      if (book.copies <= 0) {
                        toast.error("No copies available for borrowing");
                        return;
                      }
                      dispatch(openBorrowModal({ ...book, id: book._id }))
                    }}>
                      Borrow Book
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DeleteBookModal />
      <UpdateBookModal />
      <BorrowModal />
    </div>
  );
}
