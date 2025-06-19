"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function WorkoutDialog({
  open,
  onOpenChange,
  newWorkout,
  setNewWorkout,
  newExercise,
  setNewExercise,
  onAddExercise,
  onSaveWorkout,
}) {
  return (
    (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Workout</DialogTitle>
          <DialogDescription>Track your workout session and exercises</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="workout-type">Workout Type</Label>
              <Select
                value={newWorkout.type}
                onValueChange={(value) => setNewWorkout((prev) => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select workout type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Strength Training">Strength Training</SelectItem>
                  <SelectItem value="Cardio">Cardio</SelectItem>
                  <SelectItem value="HIIT">HIIT</SelectItem>
                  <SelectItem value="Yoga">Yoga</SelectItem>
                  <SelectItem value="CrossFit">CrossFit</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={newWorkout.duration || ""}
                onChange={(e) => setNewWorkout((prev) => ({ ...prev, duration: Number.parseInt(e.target.value) || 0 }))} />
            </div>
          </div>

          <div>
            <Label htmlFor="calories">Calories Burned (optional)</Label>
            <Input
              id="calories"
              type="number"
              value={newWorkout.caloriesBurned || ""}
              onChange={(e) =>
                setNewWorkout(
                  (prev) => ({ ...prev, caloriesBurned: Number.parseInt(e.target.value) || 0 })
                )
              } />
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Add Exercises</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
              <Input
                placeholder="Exercise name"
                value={newExercise.name}
                onChange={(e) => setNewExercise((prev) => ({ ...prev, name: e.target.value }))} />
              <Input
                placeholder="Sets"
                type="number"
                value={newExercise.sets || ""}
                onChange={(e) => setNewExercise((prev) => ({ ...prev, sets: Number.parseInt(e.target.value) || 0 }))} />
              <Input
                placeholder="Reps"
                type="number"
                value={newExercise.reps || ""}
                onChange={(e) => setNewExercise((prev) => ({ ...prev, reps: Number.parseInt(e.target.value) || 0 }))} />
              <Input
                placeholder="Weight (kg)"
                type="number"
                value={newExercise.weight || ""}
                onChange={(e) => setNewExercise((prev) => ({ ...prev, weight: Number.parseInt(e.target.value) || 0 }))} />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={onAddExercise}
              className="w-full">
              Add Exercise
            </Button>
          </div>

          {newWorkout.exercises && newWorkout.exercises.length > 0 && (
            <div>
              <h5 className="font-medium mb-2">Exercises Added:</h5>
              <div className="space-y-2">
                {newWorkout.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-muted rounded">
                    <span>{exercise.name}</span>
                    <span>
                      {exercise.sets} sets × {exercise.reps} reps {exercise.weight ? `@ ${exercise.weight}kg` : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              value={newWorkout.notes || ""}
              onChange={(e) => setNewWorkout((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="How did the workout feel? Any observations..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSaveWorkout}>Save Workout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>)
  );
}
