import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function PRDialog({ open, onOpenChange, newPR, setNewPR, editingPR, onSavePR, onCancel }) {
  return (
    (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingPR ? "Edit" : "Add"} Personal Record</DialogTitle>
          <DialogDescription>Track your best performance for each exercise</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="pr-exercise">Exercise</Label>
            <Input
              id="pr-exercise"
              value={newPR.exercise}
              onChange={(e) => setNewPR((prev) => ({ ...prev, exercise: e.target.value }))}
              placeholder="e.g., Bench Press, Squat, Deadlift" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pr-weight">Weight (kg)</Label>
              <Input
                id="pr-weight"
                type="number"
                value={newPR.weight || ""}
                onChange={(e) => setNewPR((prev) => ({ ...prev, weight: Number.parseFloat(e.target.value) || 0 }))} />
            </div>
            <div>
              <Label htmlFor="pr-reps">Reps</Label>
              <Input
                id="pr-reps"
                type="number"
                value={newPR.reps || ""}
                onChange={(e) => setNewPR((prev) => ({ ...prev, reps: Number.parseInt(e.target.value) || 0 }))} />
            </div>
          </div>
          <div>
            <Label htmlFor="pr-date">Date</Label>
            <Input
              id="pr-date"
              type="date"
              value={newPR.date}
              onChange={(e) => setNewPR((prev) => ({ ...prev, date: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="pr-notes">Notes (optional)</Label>
            <Textarea
              id="pr-notes"
              value={newPR.notes || ""}
              onChange={(e) => setNewPR((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="How did it feel? Training conditions..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSavePR}>{editingPR ? "Update" : "Save"} PR</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>)
  );
}
