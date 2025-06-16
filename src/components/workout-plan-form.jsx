"use client";

import { ExerciseList } from "@/components/exercise-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowBigLeft, PlusCircle, Save } from "lucide-react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAxios } from "@/context/AxiosProvider";

export function WorkoutPlanForm() {
  const { id: workoutPlanId } = useParams();
  const axios = useAxios();
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([
    {
      id: Date.now().toString(),
      name: "",
      sets: "",
      repetitions: "",
      load: "",
      notes: "",
    },
  ]);
  const [generalNotes, setGeneralNotes] = useState("");

  const addExercise = () => {
    setExercises((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "",
        sets: "",
        repetitions: "",
        load: "",
        notes: "",
      },
    ]);
  };

  const updateExercise = (id, field, value) => {
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const removeExercise = (id) => {
    if (exercises.length > 1) {
      setExercises((prev) => prev.filter((exercise) => exercise.id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!workoutPlanId) {
      alert("ID piano allenamento non trovato, impossibile salvare.");
      return;
    }

    // Validazione: ogni esercizio deve avere un nome valido
    for (const ex of exercises) {
      if (!ex.name || ex.name.trim() === "") {
        alert("Inserisci un nome esercizio valido per tutte le righe.");
        return;
      }
    }

    const payloadExercises = exercises.map((ex) => ({
      name: ex.name.trim(), // nome esercizio libero inserito
      sets: ex.sets ? Number(ex.sets) : null,
      repetitions: ex.repetitions ? Number(ex.repetitions) : null,
      load: ex.load ? Number(ex.load) : null,
      notes: ex.notes || null,
    }));

    try {
      await axios.post(`/api/workout-plans/${workoutPlanId}/exercises`, {
        exercises: payloadExercises,
        general_notes: generalNotes || null,
      });

      alert("Esercizi salvati con successo!");
      navigate(`/`);
    } catch (error) {
      console.error("Errore durante il salvataggio degli esercizi:", error);
      if (error.response?.data) {
        console.error("Dettagli errore backend:", error.response.data);
        alert("Errore: " + JSON.stringify(error.response.data));
      } else {
        alert("Errore nel salvataggio degli esercizi");
      }
    }
  };

  return (
    <div className="flex flex-col max-w-3xl gap-6 mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Aggiungi Esercizi al Piano</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addExercise}
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Aggiungi Esercizio
              </Button>
            </CardHeader>
            <CardContent>
              <ExerciseList
                exercises={exercises}
                updateExercise={updateExercise}
                removeExercise={removeExercise}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Note Aggiuntive</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generalNotes}
                onChange={(e) => setGeneralNotes(e.target.value)}
                placeholder="Inserisci eventuali note aggiuntive per questo piano di allenamento"
                className="min-h-[100px]"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to={`/workout-plans/${workoutPlanId}`}>
                <Button type="button" variant="outline">
                  <ArrowBigLeft className="w-4 h-4 mr-2" />
                  Indietro
                </Button>
              </Link>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Salva Esercizi
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
