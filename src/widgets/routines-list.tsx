import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Plus } from "lucide-react"

export function RoutinesList() {
  const routines = [
    {
      id: 1,
      title: "Morning Routine",
      time: "6:00 AM - 7:30 AM",
      tasks: [
        { id: 1, name: "Wake up at 6:00 AM", completed: true },
        { id: 2, name: "Drink water", completed: true },
        { id: 3, name: "15 minutes meditation", completed: false },
        { id: 4, name: "30 minutes exercise", completed: false },
      ],
    },
    {
      id: 2,
      title: "Evening Routine",
      time: "8:00 PM - 10:00 PM",
      tasks: [
        { id: 1, name: "Review goals", completed: true },
        { id: 2, name: "Plan tomorrow", completed: true },
        { id: 3, name: "Read for 30 minutes", completed: false },
        { id: 4, name: "Sleep by 10:00 PM", completed: false },
      ],
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Routines</CardTitle>
          <CardDescription>Your daily routines and habits</CardDescription>
        </div>
        <Clock className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {routines.map((routine) => (
            <div key={routine.id} className="flex flex-col space-y-2 rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{routine.title}</span>
                <Badge variant="outline">{routine.time}</Badge>
              </div>
              <div className="space-y-1">
                {routine.tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-2 text-sm">
                    {task.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                    )}
                    <span className={task.completed ? "text-muted-foreground line-through" : ""}>{task.name}</span>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-2 w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Add task
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
