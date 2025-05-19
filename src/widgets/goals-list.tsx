import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@radix-ui/react-progress"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
import { CalendarDays, Target } from "lucide-react"

export function GoalsList() {
  const goals = [
    {
      id: 1,
      title: "Complete Web Development Course",
      category: "Learning",
      dueDate: "May 15, 2025",
      progress: 65,
    },
    {
      id: 2,
      title: "Run 5K Marathon",
      category: "Health",
      dueDate: "June 30, 2025",
      progress: 40,
    },
    {
      id: 3,
      title: "Read 20 Books This Year",
      category: "Personal",
      dueDate: "December 31, 2025",
      progress: 25,
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Goals</CardTitle>
          <CardDescription>Track your progress towards your goals</CardDescription>
        </div>
        <Target className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="flex flex-col space-y-2 rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{goal.title}</span>
                <Badge variant="outline">{goal.category}</Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="mr-1 h-3 w-3" />
                Due: {goal.dueDate}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
