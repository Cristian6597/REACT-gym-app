import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"

export function WorkoutTrackingCard({ workouts }) {
  return (
    (<Card className="dark:bg-[#18171B]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Workouts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {workouts.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No workouts tracked yet. Add your first workout!</p>
        ) : (
          <div className="space-y-4">
            {workouts.slice(0, 5).map((workout) => (
              <div key={workout.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{workout.type}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(workout.date).toLocaleDateString()} • {workout.duration} min
                    </p>
                  </div>
                  {workout.caloriesBurned && <Badge variant="secondary">{workout.caloriesBurned} cal</Badge>}
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">{workout.exercises.length} exercises</p>
                  {workout.notes && <p className="mt-1 text-xs italic">{workout.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>)
  );
}
