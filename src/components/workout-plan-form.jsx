"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ExerciseList } from "@/components/exercise-list";
import { ArrowBigLeft, PlusCircle, Save } from "lucide-react";
import { Link } from "react-router-dom";

// Dati di esempio per i clienti
const MOCK_CLIENTS = [
  { id: "1", name: "Marco Rossi" },
  { id: "2", name: "Laura Bianchi" },
  { id: "3", name: "Giovanni Verdi" },
  { id: "4", name: "Francesca Neri" },
  { id: "5", name: "Alessandro Marrone" },
];

export function WorkoutPlanForm() {
  const [selectedClient, setSelectedClient] = useState("");
  const [exercises, setExercises] = useState([
    { id: "1", name: "", sets: "", reps: "", rest: "", notes: "" },
  ]);

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        id: Date.now().toString(),
        name: "",
        sets: "",
        reps: "",
        rest: "",
        notes: "",
      },
    ]);
  };

  const updateExercise = (id, field, value) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const removeExercise = (id) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((exercise) => exercise.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui andrebbe la logica per salvare il piano di allenamento
    console.log("Cliente selezionato:", selectedClient);
    console.log("Esercizi:", exercises);
    // Implementare la chiamata API per salvare i dati
  };

  return (
    <div className="flex flex-col gap-6 mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Generali</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Titolo del Piano</Label>
                <Input
                  id="title"
                  placeholder="es. Piano Forza Superiore"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="client">Cliente</Label>
                <Select
                  value={selectedClient}
                  onValueChange={setSelectedClient}
                  required
                >
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Seleziona un cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_CLIENTS.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                  id="description"
                  placeholder="Descrizione del piano di allenamento"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start-date">Data Inizio</Label>
                  <Input id="start-date" type="date" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end-date">Data Fine</Label>
                  <Input id="end-date" type="date" required />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Esercizi</CardTitle>
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
                placeholder="Inserisci eventuali note aggiuntive per questo piano di allenamento"
                className="min-h-[100px]"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to="/">
                <Button type="button" variant="outline">
                  <ArrowBigLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
