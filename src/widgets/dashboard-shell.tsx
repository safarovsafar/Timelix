import type { ReactNode } from "react"
import { Target } from "lucide-react"
import Link from "next/link"
import { DashboardNav } from "./dashboard-nav"
import { UserNav } from "./user-nav"

interface DashboardShellProps {
    children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
    return (
        <div className="flex flex-col mt-20">
                <main className="flex w-full flex-1 flex-col px-4 overflow-hidden py-6">
                    <div className="grid gap-6">{children}</div>
                </main>
        </div>
    )
}
