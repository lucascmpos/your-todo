'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Todo } from '../types'
import { upsertTodo } from '../actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { upsertTodoSchema } from '../schema'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { Plus } from 'lucide-react'

type TodoUpsertDialogProps = {
  children?: React.ReactNode
  defaultValue?: Todo
}

export function TodoUpsertDialog({ children }: TodoUpsertDialogProps) {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(upsertTodoSchema),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await upsertTodo(data)
    router.refresh()

    ref.current?.click()

    toast({
      title: 'Tarefa adicionada!',
      description: 'Sua nova tarefa foi adicionada à lista.',
    })
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div ref={ref}>{children}</div>
      </DialogTrigger>
      <DialogContent className="rounded-sm">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Nova tarefa</DialogTitle>
              <DialogDescription>
                Escreva no campo abaixo e salve para adicionar uma nova tarefa.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="ir para a academia..." {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button className="flex items-center gap-1" type="submit">
                <Plus size={20} />
                Adicionar tarefa
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
