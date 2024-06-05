"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react'
import { toast } from "@/components/ui/use-toast"

export default function AuthForm() {

  const form = useForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try{
      await signIn('email', {email: data.email, redirect: false})
      toast({
        title: 'Magic Link Sent',
        description: 'Check your email to login'
      })
    } catch(error) {
      toast({
        title: 'Error',
        description: 'Please try again later'
      })
    }
  })

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Magic Link Login</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your email to receive a magic link to log in.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input id="email" type="email" placeholder="m@example.com" {... form.register('email')} required />
          </div>
          <Button type="submit" className="w-full">
            Send Magic Link
          </Button>
        </form>
        
      </div>
    </div>
  )
}