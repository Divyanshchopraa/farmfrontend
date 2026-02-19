"use client"

import { History, CalendarDays, CloudSun, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const actions = [
  {
    icon: History,
    label: "My Crop History",
    description: "View past diagnoses",
    color: "bg-chart-1/15 text-chart-1",
  },
  {
    icon: CalendarDays,
    label: "7-Day Treatment Plans",
    description: "Follow step-by-step care",
    color: "bg-chart-2/15 text-chart-2",
  },
  {
    icon: CloudSun,
    label: "Weather Alerts",
    description: "Rain, heat & pest warnings",
    color: "bg-chart-5/15 text-chart-5",
  },
]

export function QuickActions() {
  return (
    <section aria-label="Quick actions">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Quick Actions
      </h3>
      <div className="flex flex-col gap-3">
        {actions.map((action) => (
          <Card
            key={action.label}
            className="cursor-pointer hover:bg-secondary/60 transition-colors active:scale-[0.98] py-0 border-border"
          >
            <CardContent className="flex items-center gap-4 py-3.5">
              <div
                className={`size-11 rounded-xl flex items-center justify-center flex-shrink-0 ${action.color}`}
              >
                <action.icon className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-[15px]">
                  {action.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {action.description}
                </p>
              </div>
              <ChevronRight className="size-5 text-muted-foreground flex-shrink-0" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
