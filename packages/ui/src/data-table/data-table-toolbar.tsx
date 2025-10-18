import { Cross2Icon } from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';
import { type JSX, useState } from 'react';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Switch } from '../components/switch';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';
import { statuses } from './table/data';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumn: string;
}

export function DataTableToolbar<TData>({ table, filterColumn }: DataTableToolbarProps<TData>): JSX.Element {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [showConfigMethods, setShowConfigMethods] = useState(true);

  const handleShowConfig = (): void => {
    setShowConfigMethods(!showConfigMethods);
    if (showConfigMethods) {
      table.getColumn('is_config')?.setFilterValue(false);
    } else {
      table.getColumn('is_config')?.setFilterValue(null);
    }
  };

  const handleResetFilters = (): void => {
    table.resetColumnFilters();
    setShowConfigMethods(true);
  };

  return (
    <div className='flex flex-col gap-4 py-4 sm:flex-row sm:items-center'>
      <div className='flex flex-1 items-center gap-2'>
        <Input
          className='max-w-sm'
          onChange={(event) => table.getColumn(filterColumn)?.setFilterValue(event.target.value)}
          placeholder='Filter tests...'
          value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ''}
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter column={table.getColumn('status')} options={statuses} title='Status' />
        )}
      </div>

      <div className='flex items-center gap-2'>
        <div className='flex items-center space-x-2'>
          <Switch checked={showConfigMethods} id='show-config-methods' onCheckedChange={handleShowConfig} />
          <label htmlFor='show-config-methods'>Show Config Methods</label>
        </div>

        {isFiltered && (
          <Button className='h-8 px-2 lg:px-3' onClick={handleResetFilters} variant='ghost'>
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
