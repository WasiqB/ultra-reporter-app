import { ColumnDef } from '@tanstack/react-table';
import { statuses, TestResultData } from './data';
import { Button } from '@/components/ui/button';
import { CircleAlert, Link, TestTube } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TestException, TestLog } from '@/types/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CellData, SortableHeader } from './cell-text-data';
import { formatDuration, formatTime } from '@/lib/formatting';
import { GearIcon } from '@radix-ui/react-icons';
import { TooltipWrapper } from '@/components/utils/tooltip-wrapper';
import { useState } from 'react';
import { AttachmentDialog } from './attachment';

export const columns: ColumnDef<TestResultData>[] = [
  {
    accessorKey: 'suite_name',
    header: 'Suite Name',
    cell: ({ row }) => {
      const value = row.getValue('suite_name') as string;
      return <CellData value={value} />;
    },
  },
  {
    accessorKey: 'test_name',
    header: 'Test Name',
    cell: ({ row }) => {
      const value = row.getValue('test_name') as string;
      return <CellData value={value} />;
    },
  },
  {
    accessorKey: 'class_name',
    header: 'Class Name',
    cell: ({ row }) => {
      const value = row.getValue('class_name') as string;
      return <CellData value={value} />;
    },
  },
  {
    accessorKey: 'method_name',
    cell: ({ row }) => {
      const value = row.getValue('method_name') as string;
      return <CellData value={value} />;
    },
    header: ({ column }) => (
      <SortableHeader column={column} header='Method Name' />
    ),
  },
  {
    accessorKey: 'is_config',
    header: 'Type',
    cell: ({ row }) => {
      const value = row.getValue('is_config');
      return (
        <TooltipWrapper text={value ? 'Configuration method' : 'Test method'}>
          <div className='flex max-w-10 items-center'>
            {value ? (
              <GearIcon className='h-4 w-4 text-orange-600' />
            ) : (
              <TestTube className='h-4 w-4 text-blue-600' />
            )}
          </div>
        </TooltipWrapper>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column} header='Status' />,
    cell: ({ row }) => {
      const foundStatus = statuses.find(
        (status) => status.value === row.getValue('status')
      );
      if (!foundStatus) {
        return null;
      }
      return (
        <div className='flex items-center'>
          {foundStatus && (
            <Badge className={foundStatus.badge_style}>
              <foundStatus.icon
                className={cn('mr-2 h-4 w-4', foundStatus.label_style)}
              />
              {foundStatus.label}
            </Badge>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'exception',
    header: () => (
      <div className='items-center'>
        <CircleAlert className='h-4 w-4' />
      </div>
    ),
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      const exception = row.getValue('exception') as TestException;
      return (
        <>
          {exception && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant='link'
                  onClick={() => setIsOpen(true)}
                  className='w-15'
                >
                  <CircleAlert className='h-4 w-4 text-red-500' />
                </Button>
              </DialogTrigger>
              <DialogContent className='flex flex-col sm:max-h-[90vh] sm:max-w-[90vw]'>
                <DialogHeader>
                  <DialogTitle>Exception</DialogTitle>
                  <DialogDescription>
                    Here you can see the Test related Exception
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-1 items-center gap-4'>
                    {exception ? (
                      <Card>
                        <CardHeader>
                          <CardTitle className='text-red-500'>
                            Message: {exception.message.trim()}
                          </CardTitle>
                          <CardDescription className='text-red-400'>
                            Exception class: {exception.class_name}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <pre className='mockup-code max-h-[300px] overflow-auto'>
                            {exception.stack_trace.map((line, index) => (
                              <code key={index} className='block pl-2'>
                                {line.startsWith('at') && '\t'}
                                {line.trim()}
                              </code>
                            ))}
                          </pre>
                        </CardContent>
                      </Card>
                    ) : (
                      <p>No exception for this test</p>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </>
      );
    },
  },
  {
    accessorKey: 'attachment',
    header: () => <Link className='h-4 w-4' />,
    cell: ({ row }) => {
      const attachment = row.getValue('attachment') as TestLog;
      const content = attachment.line?.trim();
      return (
        attachment && (
          <AttachmentDialog
            title='Attachment'
            description='Below is the attachment from your Test'
            content={content}
          />
        )
      );
    },
  },
  {
    accessorKey: 'started_at',
    header: ({ column }) => (
      <SortableHeader column={column} header='Started At' />
    ),
    cell: ({ row }) => {
      const dateTime: string = row.getValue('started_at');
      const value = formatTime(dateTime);
      return <CellData value={value} align='right' />;
    },
  },
  {
    accessorKey: 'finished_at',
    header: ({ column }) => (
      <SortableHeader column={column} header='Finished At' />
    ),
    cell: ({ row }) => {
      const dateTime: string = row.getValue('finished_at');
      const value = formatTime(dateTime);
      return <CellData value={value} align='right' />;
    },
  },
  {
    accessorKey: 'duration_ms',
    header: ({ column }) => (
      <SortableHeader column={column} header='Duration' />
    ),
    cell: ({ row }) => {
      const duration = parseInt(row.getValue('duration_ms'));
      const value = formatDuration(duration);
      return <CellData value={value} align='right' />;
    },
  },
];
