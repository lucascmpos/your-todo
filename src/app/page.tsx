'use client'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <main>
      <header className="flex justify-between p-4">
        <Logo /> <Button onClick={() => router.push('/auth')}>Entrar</Button>
      </header>
      <div className="flex px-4 flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Home</h1>
      </div>
    </main>
  )
}
