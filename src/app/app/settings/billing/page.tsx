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
import { createCheckoutSessionAction } from './actions'
import { auth } from '@/services/auth'
import { getUserCurrentPlan } from '@/services/stripe'

export default async function Page() {
  const session = await auth()
  const plan = await getUserCurrentPlan(session?.user.id as string)
  return (
    <form action={createCheckoutSessionAction}>
      <Card>
        <CardHeader>
          <CardTitle>Assinatura</CardTitle>
          <CardDescription>
            Atualmente você está no plano:{' '}
            <span className="font-bold uppercase">{plan.name}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <header className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                {plan.quota.TASKS.current}/{plan.quota.TASKS.available}
              </span>
              <span className="text-muted-foreground text-sm">
                {plan.quota.TASKS.usage}%
              </span>
            </header>
            <main>
              <Progress value={plan.quota.TASKS.usage} />
            </main>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col lg:flex-row items-center gap-2 border-t border-border py-6 justify-between">
          {plan.name === 'pro' ? (
            <>
              <span>Não deseja mais o nosso serviço?</span>
              <Button type="submit" disabled>
                Cancelar assinatura
              </Button>
            </>
          ) : (
            <>
              <span>Para maior limite, assine o plano PRO.</span>
              <Button type="submit">Assinar</Button>
            </>
          )}
        </CardFooter>
      </Card>
    </form>
  )
}
