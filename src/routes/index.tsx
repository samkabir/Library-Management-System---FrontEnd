import App from "@/App";
import AddBook from "@/pages/AddBook/AddBook";
import AllBooks from "@/pages/AllBooks/AllBooks";
import BookPage from "@/pages/BookPage/BookPage";
import BorrowSummary from "@/pages/BorrowSummary/BorrowSummary";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: AllBooks
            },
            {
                path: "/AddBook",
                Component: AddBook
            },
            {
                path: "/BorrowSummary",
                Component: BorrowSummary
            },
            {
                path: "/books/:bookId",
                Component: BookPage
            },
        ]
    }
])

export default router;