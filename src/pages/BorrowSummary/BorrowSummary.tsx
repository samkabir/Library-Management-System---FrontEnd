import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Borrow } from "@/types";

export default function BorrowSummary() {
    const {data: borrows = [], isLoading, isError} = useGetBorrowSummaryQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: true,
    refetchOnFocus: false, 
})
        
        if (isLoading) {
            return <div className="text-white text-2xl">Loading Borrow Summary...</div>
        }
        
        if (isError) {
            return <div className="text-red-500 text-2xl">Error loading Borrow Summary</div>
        }
    
        console.log(borrows); 

    return(
        <div className="p-4">
            <h1 className="text-white text-4xl mb-4">BorrowSummary</h1>


            <div className="rounded-md border border-gray-600 overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>ISBN</TableHead>
                          <TableHead>Quantity</TableHead>
                        </TableRow>
                      </TableHeader>
            
                      <TableBody>
                        {borrows.data.map((borrow: Borrow, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{borrow.book.title}</TableCell>
                            <TableCell>{borrow.book.isbn}</TableCell>
                            <TableCell>{borrow.totalQuantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
        </div>
    )
}