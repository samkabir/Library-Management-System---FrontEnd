import { useGetSingleABookQuery } from "@/redux/api/baseApi";
import { useParams } from "react-router";

export default function BookPage () {
    const { bookId } = useParams<{ bookId: string }>();
    const { data, isLoading, isError } = useGetSingleABookQuery(bookId);

    if (isLoading) return <div className="p-4 text-white">Loading...</div>;
    if (isError) return <div className="p-4 text-red-500">Error loading book details.</div>;
    if (!data) return <div className="p-4 text-white">No data found.</div>;

    return (
        <div className="p-4">
            <div className="bg-gray-800 p-6 rounded shadow text-white">
                <h2 className="text-2xl font-bold mb-2">{data.data.title}</h2>
                <p className="mb-1"><span className="font-semibold">Author:</span> {data.data.author}</p>
                <p className="mb-1"><span className="font-semibold">Genre:</span> {data.data.genre}</p>
                <p className="mb-1"><span className="font-semibold">ISBN:</span> {data.data.isbn}</p>
                <p className="mb-1"><span className="font-semibold">Available:</span> {data.data.available ? "Yes" : "No"}</p>
                <p className="mb-1"><span className="font-semibold">Copies:</span> {data.data.copies}</p>
                <p className="mb-1"><span className="font-semibold">Description:</span> {data.data.description}</p>
                <p className="mb-1"><span className="font-semibold">Created At:</span> {new Date(data.data.createdAt).toLocaleString()}</p>
                <p className="mb-1"><span className="font-semibold">Updated At:</span> {new Date(data.data.updatedAt).toLocaleString()}</p>
            </div>
        </div>
    );
}