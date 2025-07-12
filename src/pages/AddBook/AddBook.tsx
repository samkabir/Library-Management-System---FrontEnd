import BookForm from "@/components/BookForm/BookForm";


export default function AddBook() {
    

    return(
        <div className="p-4">
            <h1 className="text-white text-center text-4xl mb-4">Add A Book</h1>
            <BookForm />
        </div>
    )
}