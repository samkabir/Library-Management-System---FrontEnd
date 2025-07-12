import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import type { TableSkeletonProps } from "@/types";



export default function TableSkeleton({
  rows = 5,
  columns = 4,
  showHeader = true,
  columnWidths = [],
  headerLabels = [],
  showActionColumn = false,
}: TableSkeletonProps) {
  const totalColumns = showActionColumn ? columns : columns;

  const getColumnWidth = (index: number) => {
    if (columnWidths[index]) return columnWidths[index];
    if (showActionColumn && index === totalColumns - 1) return "w-20"; 
    return "w-full";
  };

  const getHeaderLabel = (index: number) => {
    if (headerLabels[index]) return headerLabels[index];
    if (showActionColumn && index === totalColumns - 1) return "";
    return `Column ${index}`;
  };

  return (
   <div className="w-full">
      <Table>
        {showHeader && (
          <TableHeader>
            <TableRow>
              {Array.from({ length: totalColumns }).map((_, index) => (
                <TableHead key={index} className={getColumnWidth(index)}>
                  {headerLabels.length > 0 ? (
                    getHeaderLabel(index)
                  ) : (
                    <Skeleton className="h-4 w-24" />
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: totalColumns }).map((_, colIndex) => (
                <TableCell key={colIndex} className={getColumnWidth(colIndex)}>
                  {showActionColumn && colIndex === totalColumns - 1 ? (
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-8 w-8 rounded" />
                    </div>
                  ) : (
                    <Skeleton 
                      className={`h-4 ${
                        colIndex === 0 ? 'w-32' : 
                        colIndex === 1 ? 'w-24' : 
                        colIndex === 2 ? 'w-16' : 
                        'w-20'
                      }`} 
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


