'use client'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <body>
      <header className="flex  justify-between  backdrop-filter backdrop-blur-lg border-b border-border p-4 ">
        <Logo /> <Button onClick={() => router.push('/auth')}>Entrar</Button>
      </header>
     <main className='flex px-4 flex-col items-center justify-center h-screen'>
     <div className='flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-extralight text-center'><span className='text-primary font-bold'>Your Todo</span> é a melhor maneira pra você organizar seu dia-a-dia</h1>
        <span className='text-center text-xs font-semibold mt-3'>Conheça a ferramenta mais moderna, organizada e simples para o seu negócio</span>
        <Image src="/home-print.png" alt="hero" width={1080} height={1080} className='w-[500px] mt-20 border border-primary' />
      </div>

      <div className='flex flex-col mt-28'>
        <h1 className='text-2xl font-extralight text-center'>Desenvolvido com as melhores ferramentas do mercado</h1>
        <div className='bg-gray-300 w-1/2 h-fit rounded-md grid grid-cols-3'>
          <Image src="/next.svg" alt="hero" width={1080} height={1080} className='w-[500px] mt-20 border border-primary' />
          <Image src="/vercel-logo.svg" alt="hero" width={1080} height={1080} className='w-[500px] mt-20 border border-primary' />
          <Image src="/prisma-logo.svg" alt="hero" width={1080} height={1080} className='w-[500px] mt-20 border border-primary' />
          </div>
      </div>
     </main>
    </body>
  )
}