"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

type UserInfoProps = {
  user: Session['user']
}

export default function UserInfo({user}: UserInfoProps) {

  if(!user) return

  return(
    <div className="flex gap-2 flex-col items-center justify-center">
      <Avatar>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <span>{user?.email}</span>

      <Button variant="outline" onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  )
}