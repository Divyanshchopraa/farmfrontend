import { Leaf, AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type DiagnosisStatus = "healthy" | "risk" | "treated"

interface DiagnosisItem {
  crop: string
  disease: string
  status: DiagnosisStatus
  date: string
}

const diagnoses: DiagnosisItem[] = [
  {
    crop: "Tomato",
    disease: "Early Blight",
    status: "risk",
    date: "Today",
  },
  {
    crop: "Rice",
    disease: "No disease found",
    status: "healthy",
    date: "Yesterday",
  },
  {
    crop: "Wheat",
    disease: "Rust (treated)",
    status: "treated",
    date: "3 days ago",
  },
]

const statusConfig: Record<
  DiagnosisStatus,
  { label: string; icon: typeof Leaf; className: string }
> = {
  healthy: {
    label: "Healthy",
    icon: CheckCircle2,
    className:
      "bg-primary/15 text-primary border-primary/25 hover:bg-primary/15",
  },
  risk: {
    label: "At Risk",
    icon: AlertTriangle,
    className:
      "bg-destructive/15 text-destructive border-destructive/25 hover:bg-destructive/15",
  },
  treated: {
    label: "Treated",
    icon: Leaf,
    className:
      "bg-chart-4/20 text-chart-3 border-chart-3/25 hover:bg-chart-4/20",
  },
}

export function RecentDiagnosis() {
  return (
    <section aria-label="Recent diagnoses">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Recent Diagnoses
        </h3>
        <button className="text-xs font-medium text-primary hover:underline">
          View All
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {diagnoses.map((item, i) => {
          const config = statusConfig[item.status]
          const StatusIcon = config.icon
          return (
            <Card
              key={i}
              className="cursor-pointer hover:bg-secondary/60 transition-colors active:scale-[0.98] py-0 border-border"
            >
              <CardContent className="flex items-center gap-4 py-3.5">
                <div className="size-11 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <Leaf className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground text-[15px]">
                      {item.crop}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-[10px] px-2 py-0 h-5 gap-1 font-medium ${config.className}`}
                    >
                      <StatusIcon className="size-3" />
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.disease}
                    <span className="mx-1.5">{"·"}</span>
                    {item.date}
                  </p>
                </div>
                <ChevronRight className="size-5 text-muted-foreground flex-shrink-0" />
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
