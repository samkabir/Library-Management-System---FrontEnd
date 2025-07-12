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
                <h2 className="text-4xl font-black mb-10">{data.data.title}</h2>
                <p className="mb-2 rounded-xl bg-indigo-900 p-3"><span className="font-semibold">Author:</span> {data.data.author}</p>
                <p className="mb-5 rounded-xl bg-violet-900 p-3"><span className="font-semibold">Genre:</span> <span className="">{data.data.genre}</span></p>
                <p className="mb-5 rounded-xl bg-purple-800 p-3"><span className="font-semibold">ISBN:</span> {data.data.isbn}</p>
                <div className="flex gap-4 mb-5">
                    <p className={`mb-1 rounded-xl bg-cyan-800 p-3`}><span className="font-semibold">Copies:</span> {data.data.copies}</p>
                    <p className={`mb-1 rounded-xl p-3 ${data.data.available ? " bg-green-800 " : " bg-red-800 "}`}><span className="font-semibold">Available:</span> {data.data.available ? "Yes" : "No"}</p>
                </div>
                <p className="mb-5 rounded-xl bg-gray-600 p-5">{data.data.description}</p>

                <div className="flex gap-4 ">
                    <p className="mb-1 rounded-xl bg-fuchsia-800 p-3">
                        <span className="font-semibold">Created At:</span> {new Date(data.data.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <p className="mb-1 rounded-xl bg-pink-800 p-3">
                        <span className="font-semibold">Updated At:</span> {new Date(data.data.updatedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>
                
            </div>
        </div>
    );
}