"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

export function ExerciseList({ exercises, updateExercise, removeExercise }) {
  return (
    <div className="space-y-6">
      {exercises.map((exercise, index) => (
        <div key={exercise.id} className="p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Esercizio {index + 1}</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeExercise(exercise.id)}
              disabled={exercises.length === 1}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor={`name-${exercise.id}`}>Nome Esercizio</Label>
              <Input
                id={`name-${exercise.id}`}
                value={exercise.name}
                onChange={(e) =>
                  updateExercise(exercise.id, "name", e.target.value)
                }
                placeholder="Inserisci il nome dell'esercizio"
                required
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="grid gap-2">
                <Label htmlFor={`sets-${exercise.id}`}>Serie</Label>
                <Input
                  id={`sets-${exercise.id}`}
                  value={exercise.sets || ""}
                  onChange={(e) =>
                    updateExercise(exercise.id, "sets", e.target.value)
                  }
                  placeholder="es. 3"
                  type="number"
                  min="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`repetitions-${exercise.id}`}>
                  Ripetizioni
                </Label>
                <Input
                  id={`repetitions-${exercise.id}`}
                  value={exercise.repetitions || ""}
                  onChange={(e) =>
                    updateExercise(exercise.id, "repetitions", e.target.value)
                  }
                  placeholder="es. 10-12"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`load-${exercise.id}`}>Carico (kg)</Label>
                <Input
                  id={`load-${exercise.id}`}
                  value={exercise.load || ""}
                  onChange={(e) =>
                    updateExercise(exercise.id, "load", e.target.value)
                  }
                  placeholder="es. 50"
                  type="number"
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`notes-${exercise.id}`}>Note</Label>
                <Textarea
                  id={`notes-${exercise.id}`}
                  value={exercise.notes || ""}
                  onChange={(e) =>
                    updateExercise(exercise.id, "notes", e.target.value)
                  }
                  placeholder="Note aggiuntive"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
