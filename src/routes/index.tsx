import App from "@/App";
import AddBook from "@/pages/AddBook/AddBook";
import AllBooks from "@/pages/AllBooks/AllBooks";
import BorrowSummary from "@/pages/BorrowSummary/BorrowSummary";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        // element: <App />
        Component: App,
        children: [
            {
                index: true,
                // path: "user",
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
        ]
    }
])

export default router;