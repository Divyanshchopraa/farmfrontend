"use client"
import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


export function Header() {
  const router = useRouter()  
  return (
    <header className="flex items-center justify-between px-5 py-4">
      <div>
<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight 
                text-black
               bg-clip-text  
               flex items-center gap-3">
  Farm Care  
</h1>


      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
        </Button>
      </div>
    </header>
  )
}