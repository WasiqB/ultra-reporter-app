import type { Table } from '@tanstack/react-table';
import type { JSX } from 'react';
import { Button } from '../components/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/select';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>): JSX.Element {
  return (
    <div className='flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex items-center justify-center gap-4 sm:gap-0'>
        <div className='text-muted-foreground text-sm'>Total row(s): {table.getFilteredRowModel().rows.length}</div>
        <div className='flex items-center space-x-2 sm:hidden'>
          <p className='font-medium text-sm'>Rows per page</p>
          <Select
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
            value={`${table.getState().pagination.pageSize}`}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='flex flex-col items-center gap-4 sm:flex-row sm:gap-8'>
        <div className='hidden items-center space-x-2 sm:flex'>
          <p className='font-medium text-sm'>Rows per page</p>
          <Select
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
            value={`${table.getState().pagination.pageSize}`}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center space-x-2'>
          <div className='font-medium text-sm'>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className='flex space-x-2'>
            <Button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              size='sm'
              variant='outline'
            >
              Previous
            </Button>
            <Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} size='sm' variant='outline'>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
