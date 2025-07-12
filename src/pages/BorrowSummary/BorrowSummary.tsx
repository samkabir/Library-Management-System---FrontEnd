import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Borrow } from "@/types";
import TableSkeleton from "@/components/Skeleton/SkeletonTable";

export default function BorrowSummary() {
    const {data: borrows = [], isLoading, isError} = useGetBorrowSummaryQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: true,
    refetchOnFocus: false, 
})
        
        if (isLoading) {
            return <div className="text-white text-2xl">

              <TableSkeleton
                      rows={12}
                      columns={3}
                      showHeader={true}
                      showActionColumn={true}
                      headerLabels={["Title", "ISBN", "Quantity"]}
                      columnWidths={["w-1/3", "w-1/4", "w-1/6"]}
                    />
            </div>
        }
        
        if (isError) {
            return <div className="text-red-500 text-2xl">Error loading Borrow Summary</div>
        }
    

    return(
        <div className="p-4 h-screen">
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
                        {borrows.data?.map((borrow: Borrow, index: number) => (
                          <TableRow key={index}>
                            <TableCell className={!borrow?.book?.title ? "text-yellow-600" : undefined}>{borrow?.book?.title ? borrow?.book?.title : "Book data not Found"}</TableCell>
                            <TableCell className={!borrow?.book?.isbn ? "text-yellow-600" : undefined}>{borrow?.book?.isbn ? borrow?.book?.isbn : "Book ISBN not Found"}</TableCell>
                            <TableCell>{borrow.totalQuantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
        </div>
    )
}