import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/components/dashboard/page'
import { TodoDataTable } from './_components/todo-data-table'
import { TodoUpsertDialog } from './_components/todo-upsert-dialog'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'

export default async function AppPage() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Tarefas</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <TodoUpsertDialog>
            <Button
              className="flex items-center gap-1 font-semibold"
              variant="default"
              size="sm"
            >
              Adicionar tarefa
              <CirclePlus size={20} />
            </Button>
          </TodoUpsertDialog>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        <TodoDataTable />
      </DashboardPageMain>
    </DashboardPage>
  )
}
