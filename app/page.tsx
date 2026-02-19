import { Header } from "@/components/dashboard/header"
import { UploadCard } from "@/components/dashboard/upload-card"
import { VoiceCard } from "@/components/dashboard/voice-card"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentDiagnosis } from "@/components/dashboard/recent-diagnosis"
import { BottomNav } from "@/components/dashboard/bottom-nav"

export default function Home() {
  return (
    <div className="min-h-dvh bg-background max-w-lg mx-auto relative">
      <Header />

      <main className="flex flex-col gap-6 px-5 pb-28">
        {/* Primary CTA - Upload Crop Photo */}
        <UploadCard />

        {/* Voice Assistant */}
        <VoiceCard />

        {/* Quick Actions */}
        <QuickActions />

        {/* Recent Diagnoses */}
        <RecentDiagnosis />
      </main>

      <BottomNav />
    </div>
  )
}
