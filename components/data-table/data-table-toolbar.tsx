import { Table } from '@tanstack/react-table';
import { Input } from '../ui/input';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { statuses } from './data';
import { Button } from '../ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumn: string;
}

export function DataTableToolbar<TData>({
  table,
  filterColumn,
}: DataTableToolbarProps<TData>): JSX.Element {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className='flex items-center py-4'>
      <Input
        placeholder='Filter tests...'
        value={
          (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ''
        }
        onChange={(event) =>
          table.getColumn(filterColumn)?.setFilterValue(event.target.value)
        }
        className='mr-1 max-w-sm'
      />
      {table.getColumn('status') && (
        <DataTableFacetedFilter
          column={table.getColumn('status')}
          title='Status'
          options={statuses}
        />
      )}
      {isFiltered && (
        <Button
          variant='ghost'
          onClick={() => table.resetColumnFilters()}
          className='h-8 px-2 lg:px-3'
        >
          Reset
          <Cross2Icon className='ml-2 h-4 w-4' />
        </Button>
      )}
      <DataTableViewOptions table={table} />
    </div>
  );
}
