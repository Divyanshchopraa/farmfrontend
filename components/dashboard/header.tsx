import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-4">
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="wheat">{"🌾"}</span>
          Farm Care
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Crop health assistant
        </p>
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
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-primary/10 text-primary hover:bg-primary/20"
          aria-label="Profile"
        >
          <User className="size-5" />
        </Button>
      </div>
    </header>
  )
}
