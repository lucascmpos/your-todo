import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default async function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assinatura</CardTitle>
        <CardDescription>
          Atualmente você está no plano: [current_plan].
          <br /> Próxima data de cobrança: [next_due_date].
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <header className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">1/5</span>
            <span className="text-muted-foreground text-sm">20%</span>
          </header>
          <main>
            <Progress value={20} />
          </main>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2 border-t border-border py-6 justify-between">
        <span>Para maior limite, assine o plano PRO.</span>
        <Button>Upgrade</Button>
      </CardFooter>
    </Card>
  )
}
