"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Dumbbell,
  Target,
  Clock,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./ui/sidebar";

// Mock data per i workout plans
const workoutPlans = [
  {
    id: 1,
    name: "Push Day - Upper Body",
    description:
      "Allenamento focalizzato sui muscoli di spinta della parte superiore del corpo",
    muscles_involved: "Petto, Spalle, Tricipiti",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    name: "Pull Day - Upper Body",
    description: "Allenamento per i muscoli di trazione della parte superiore",
    muscles_involved: "Dorsali, Bicipiti, Deltoidi posteriori",
    created_at: "2024-01-16T10:00:00Z",
    updated_at: "2024-01-16T10:00:00Z",
  },
  {
    id: 3,
    name: "Leg Day",
    description: "Allenamento completo per le gambe e i glutei",
    muscles_involved: "Quadricipiti, Femorali, Glutei, Polpacci",
    created_at: "2024-01-17T10:00:00Z",
    updated_at: "2024-01-17T10:00:00Z",
  },
  {
    id: 4,
    name: "Full Body Beginner",
    description: "Allenamento completo per principianti",
    muscles_involved: "Tutto il corpo",
    created_at: "2024-01-18T10:00:00Z",
    updated_at: "2024-01-18T10:00:00Z",
  },
];

// Mock data per gli esercizi
const workoutExercises = {
  1: [
    {
      id: 1,
      workout_plan_id: 1,
      name: "Panca Piana",
      sets: 4,
      repetitions: 8,
      load: 80.0,
      notes: "Mantenere la schiena ben appoggiata alla panca",
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T10:00:00Z",
    },
    {
      id: 2,
      workout_plan_id: 1,
      name: "Shoulder Press",
      sets: 3,
      repetitions: 10,
      load: 25.0,
      notes: "Controllare il movimento in discesa",
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T10:00:00Z",
    },
    {
      id: 3,
      workout_plan_id: 1,
      name: "Dips",
      sets: 3,
      repetitions: 12,
      load: null,
      notes: "Corpo libero, scendere fino a 90°",
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T10:00:00Z",
    },
  ],
  2: [
    {
      id: 4,
      workout_plan_id: 2,
      name: "Trazioni",
      sets: 4,
      repetitions: 6,
      load: null,
      notes: "Presa prona, completa estensione delle braccia",
      created_at: "2024-01-16T10:00:00Z",
      updated_at: "2024-01-16T10:00:00Z",
    },
    {
      id: 5,
      workout_plan_id: 2,
      name: "Rematore con Bilanciere",
      sets: 4,
      repetitions: 8,
      load: 60.0,
      notes: "Mantenere la schiena dritta",
      created_at: "2024-01-16T10:00:00Z",
      updated_at: "2024-01-16T10:00:00Z",
    },
    {
      id: 6,
      workout_plan_id: 2,
      name: "Curl con Bilanciere",
      sets: 3,
      repetitions: 12,
      load: 20.0,
      notes: "Movimento controllato, non dondolare",
      created_at: "2024-01-16T10:00:00Z",
      updated_at: "2024-01-16T10:00:00Z",
    },
  ],
  3: [
    {
      id: 7,
      workout_plan_id: 3,
      name: "Squat",
      sets: 4,
      repetitions: 10,
      load: 100.0,
      notes: "Scendere fino a quando le cosce sono parallele al suolo",
      created_at: "2024-01-17T10:00:00Z",
      updated_at: "2024-01-17T10:00:00Z",
    },
    {
      id: 8,
      workout_plan_id: 3,
      name: "Stacchi Rumeni",
      sets: 3,
      repetitions: 8,
      load: 80.0,
      notes: "Mantenere la schiena dritta, spingere i glutei indietro",
      created_at: "2024-01-17T10:00:00Z",
      updated_at: "2024-01-17T10:00:00Z",
    },
    {
      id: 9,
      workout_plan_id: 3,
      name: "Affondi",
      sets: 3,
      repetitions: 12,
      load: 20.0,
      notes: "Alternare le gambe, ginocchio a 90°",
      created_at: "2024-01-17T10:00:00Z",
      updated_at: "2024-01-17T10:00:00Z",
    },
    {
      id: 10,
      workout_plan_id: 3,
      name: "Calf Raises",
      sets: 4,
      repetitions: 15,
      load: 40.0,
      notes: "Salire sulle punte dei piedi, pausa in alto",
      created_at: "2024-01-17T10:00:00Z",
      updated_at: "2024-01-17T10:00:00Z",
    },
  ],
  4: [
    {
      id: 11,
      workout_plan_id: 4,
      name: "Push-up",
      sets: 3,
      repetitions: 10,
      load: null,
      notes: "Corpo libero, mantenere il corpo dritto",
      created_at: "2024-01-18T10:00:00Z",
      updated_at: "2024-01-18T10:00:00Z",
    },
    {
      id: 12,
      workout_plan_id: 4,
      name: "Squat a corpo libero",
      sets: 3,
      repetitions: 15,
      load: null,
      notes: "Scendere lentamente, risalire esplosivamente",
      created_at: "2024-01-18T10:00:00Z",
      updated_at: "2024-01-18T10:00:00Z",
    },
    {
      id: 13,
      workout_plan_id: 4,
      name: "Plank",
      sets: 3,
      repetitions: null,
      load: null,
      notes: "Tenere per 30-60 secondi, corpo dritto",
      created_at: "2024-01-18T10:00:00Z",
      updated_at: "2024-01-18T10:00:00Z",
    },
  ],
};

export default function WorkoutViewer() {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [completedExercises, setCompletedExercises] = useState({});
  const { theme, setTheme } = useTheme();

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
    setCompletedExercises({}); // Reset completamento
    setIsDialogOpen(true);
  };

  const handleExerciseComplete = (exerciseId) => {
    setCompletedExercises((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const selectedExercises = selectedWorkout
    ? workoutExercises[selectedWorkout.id] || []
    : [];

  const completedCount = selectedExercises.filter(
    (ex) => completedExercises[ex.id]
  ).length;
  const completionPercentage = Math.round(
    (completedCount / selectedExercises.length) * 100
  );

  return (
    <>
      <div className="min-h-screen p-6 bg-gray-50 dark:bg-[#18191b]">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => (window.location.href = "/")}
                  className="hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                    I Tuoi Workout
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Visualizza e gestisci i tuoi piani di allenamento
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="mr-2"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>

          {/* Workout Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {workoutPlans.map((workout) => (
              <Card
                key={workout.id}
                className="transition-shadow duration-200 transform cursor-pointer border-[#FF3F3F] hover:shadow-lg hover:scale-105 dark:bg-[#18171B]"
                onClick={() => handleWorkoutClick(workout)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Dumbbell className="w-5 h-5 text-blue-600 text-[#ff3f3f80]" />
                    <CardTitle className="text-lg">{workout.name}</CardTitle>
                  </div>
                  <CardDescription className="text-sm line-clamp-2">
                    {workout.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Muscoli coinvolti:
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {workout.muscles_involved}
                    </Badge>

                    <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>Creato il {formatDate(workout.created_at)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-50 dark:bg-[#18191b]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-gray-100">
                  <Dumbbell className="w-6 h-6 text-blue-600 text-[#ff3f3f80]" />
                  {selectedWorkout?.name}
                </DialogTitle>
              </DialogHeader>

              {selectedWorkout && (
                <div className="space-y-6">
                  {/* Descrizione */}
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#18191b]">
                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                      Descrizione
                    </h3>
                    <p className="mb-3 text-gray-700 dark:text-gray-300">
                      {selectedWorkout.description}
                    </p>

                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        Muscoli coinvolti:
                      </span>
                    </div>
                    <Badge variant="secondary">
                      {selectedWorkout.muscles_involved}
                    </Badge>

                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          Creato: {formatDate(selectedWorkout.created_at)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          Aggiornato: {formatDate(selectedWorkout.updated_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Esercizi */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                        <Dumbbell className="w-5 h-5 text-[#ff3f3f80]" />
                        Esercizi ({selectedExercises.length})
                      </h3>

                      <div className="relative w-10 h-10">
                        <svg
                          className="transform -rotate-90"
                          viewBox="0 0 36 36"
                        >
                          <path
                            className="text-gray-300"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="text-[#FF3F3F]"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeDasharray={`${completionPercentage}, 100`}
                            fill="none"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800 dark:text-gray-100">
                          {completionPercentage}%
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {selectedExercises.map((exercise, index) => (
                        <div
                          key={exercise.id}
                          className={`p-4 border rounded-lg ${
                            completedExercises[exercise.id]
                              ? "bg-green-50 border-green-500 dark:bg-green-900/20"
                              : "bg-white dark:bg-[#18191b] dark:border-[#ff3f3f80]"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                                #{index + 1}
                              </span>
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {exercise.name}
                              </h4>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleExerciseComplete(exercise.id)
                              }
                              className={`text-xs ${
                                completedExercises[exercise.id]
                                  ? "bg-green-600 text-white hover:bg-green-700"
                                  : ""
                              }`}
                            >
                              {completedExercises[exercise.id] ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Fatto
                                </>
                              ) : (
                                "Fatto"
                              )}
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 gap-4 mb-3 md:grid-cols-3">
                            {exercise.sets && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                  Serie:
                                </span>
                                <Badge variant="outline">{exercise.sets}</Badge>
                              </div>
                            )}
                            {exercise.repetitions && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                  Ripetizioni:
                                </span>
                                <Badge variant="outline">
                                  {exercise.repetitions}
                                </Badge>
                              </div>
                            )}
                            {exercise.load && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                  Carico:
                                </span>
                                <Badge variant="outline">
                                  {exercise.load} kg
                                </Badge>
                              </div>
                            )}
                          </div>

                          {exercise.notes && (
                            <>
                              <Separator className="my-3" />
                              <div>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                  Note:
                                </span>
                                <p className="mt-1 text-sm italic text-gray-700 dark:text-gray-300">
                                  {exercise.notes}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
