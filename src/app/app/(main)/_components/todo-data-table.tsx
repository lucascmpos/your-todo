'use client'

import * as React from 'react'
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Todo } from '../types'
import { useRouter } from 'next/navigation'
import { deleteTodo, upsertTodo } from '../actions'
import { toast } from '@/components/ui/use-toast'
import { Check, Plus, Copy, Trash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { TodoUpsertDialog } from './todo-upsert-dialog'

type TodoDataTable = {
  data: Todo[]
}

export function TodoDataTable({ data }: TodoDataTable) {
  const router = useRouter()

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const handleDeleteTodo = async (todo: Todo) => {
    await deleteTodo({ id: todo.id })
    router.refresh()

    toast({
      title: 'Tarefa deletada',
      description: 'A tarefa foi deletada com sucesso.',
    })
  }

  const handleToggleDoneTodo = async (todo: Todo) => {
    const doneAt = todo.doneAt ? null : new Date().toISOString()

    await upsertTodo({ id: todo.id, doneAt })
    router.refresh()

    toast({
      title: 'Marcado como feito',
      description: 'Sua tarefa foi atualizada com sucesso.',
    })
  }

  const handleCopyTodoID = (todo: Todo) => {
    navigator.clipboard.writeText(todo.id)

    toast({
      title: 'ID Copiado',
      description: 'O ID da tarefa foi copiado com sucesso.',
    })
  }

  const columns: ColumnDef<Todo>[] = [
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const { doneAt } = row.original

        const status: 'concluido' | 'pendente' = doneAt
          ? 'concluido'
          : 'pendente'
        const variant: 'outline' | 'secondary' = doneAt
          ? 'outline'
          : 'secondary'

        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Tarefa
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'createdAt',
      header: () => <div className="text-right">Criada em</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">
            {row.original.createdAt.toLocaleDateString()}
          </div>
        )
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const todo = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleCopyTodoID(todo)}>
                <Copy size={20} />
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleToggleDoneTodo(todo)}>
                <Check size={20} />
                Marcar como feito
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteTodo(todo)}>
                <Trash size={20} />
                Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Pesquise suas tarefas..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <TodoUpsertDialog>
          <Button
            className="flex items-center gap-1 font-semibold"
            variant="default"
            size="sm"
          >
            <Plus size={20} />
            Adicionar tarefa
          </Button>
        </TodoUpsertDialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
