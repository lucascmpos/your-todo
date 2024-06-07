import { ListTodo } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex items-center gap-1">
      <ListTodo size={24} />
      <span className="font-semibold text-md">Your Todo</span>
    </div>
  )
}
