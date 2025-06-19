"use client"

import { useState, useEffect } from "react"
import { Button } from "./components/ui/button"
import { Plus, Trophy, Dumbbell, Flame, Activity } from "lucide-react"
import placeholder from "@/assets/placeholder1.jpg"

import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AppSidebar } from "@/components/app-sidebar"
import { FitnessRecepieCarousel } from "./components/FitnessRecepieCarousel"

// Import custom components
import { FitnessStatsCard } from "./components/fitness-stats-card"
import { WorkoutTrackingCard } from "./components/workout-tracking-card"
import { PersonalRecordsCard } from "./components/personal-records-card"
import { ExerciseGuideCard } from "./components/exercise-guide-card"
import { SupplementsGuideCard } from "./components/supplements-guide-card"
import { TrainerCard } from "./components/trainer-card"
import { WorkoutDialog } from "./components/workout-dialog"
import { PRDialog } from "./components/pr-dialog"

import { useAxios } from "./context/AxiosProvider"

export default function Page() {
  const axios = useAxios()
  const [trainers, setTrainers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Workout tracking state
  const [workouts, setWorkouts] = useState([])
  const [personalRecords, setPersonalRecords] = useState([])
  const [showWorkoutDialog, setShowWorkoutDialog] = useState(false)
  const [showPRDialog, setShowPRDialog] = useState(false)
  const [editingPR, setEditingPR] = useState(null)

  // Form states
  const [newWorkout, setNewWorkout] = useState({
    type: "",
    duration: 0,
    exercises: [],
    notes: "",
    caloriesBurned: 0,
  })
  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: 0,
    reps: 0,
    weight: 0,
    restTime: 0,
  })
  const [newPR, setNewPR] = useState({
    exercise: "",
    weight: 0,
    reps: 0,
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedWorkouts = localStorage.getItem("gym-workouts")
    const savedPRs = localStorage.getItem("gym-personal-records")

    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts))
    }
    if (savedPRs) {
      setPersonalRecords(JSON.parse(savedPRs))
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("gym-workouts", JSON.stringify(workouts))
  }, [workouts])

  useEffect(() => {
    localStorage.setItem("gym-personal-records", JSON.stringify(personalRecords))
  }, [personalRecords])

  // Calculate fitness stats from actual workouts
  const calculateFitnessStats = () => {
    const thisWeek = new Date()
    thisWeek.setDate(thisWeek.getDate() - 7)

    const weeklyWorkouts = workouts.filter((w) => new Date(w.date) >= thisWeek)
    const totalCalories = weeklyWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0)

    return {
      weeklyGoal: 5,
      completedWorkouts: weeklyWorkouts.length,
      caloriesBurned: totalCalories,
      weeklyCalorieGoal: 2000,
      currentStreak: calculateStreak(),
      totalWorkouts: workouts.length,
    };
  }

  const calculateStreak = () => {
    if (workouts.length === 0) return 0

    const sortedWorkouts = [...workouts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    let streak = 0
    let currentDate = new Date()

    for (const workout of sortedWorkouts) {
      const workoutDate = new Date(workout.date)
      const diffDays = Math.floor((currentDate.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24))

      if (diffDays <= streak + 1) {
        streak++
        currentDate = workoutDate
      } else {
        break
      }
    }

    return streak
  }

  const fitnessStats = calculateFitnessStats()

  const addExerciseToWorkout = () => {
    if (newExercise.name && newExercise.sets > 0 && newExercise.reps > 0) {
      setNewWorkout((prev) => ({
        ...prev,
        exercises: [...(prev.exercises || []), { ...newExercise }],
      }))
      setNewExercise({ name: "", sets: 0, reps: 0, weight: 0, restTime: 0 })
    }
  }

  const saveWorkout = () => {
    if (newWorkout.type && newWorkout.duration && newWorkout.exercises?.length) {
      const workout = {
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
        type: newWorkout.type,
        duration: newWorkout.duration,
        exercises: newWorkout.exercises,
        notes: newWorkout.notes,
        caloriesBurned: newWorkout.caloriesBurned,
      }

      setWorkouts((prev) => [workout, ...prev])
      setNewWorkout({ type: "", duration: 0, exercises: [], notes: "", caloriesBurned: 0 })
      setShowWorkoutDialog(false)
    }
  }

  const savePR = () => {
    if (newPR.exercise && newPR.weight > 0 && newPR.reps > 0) {
      if (editingPR) {
        setPersonalRecords(
          (prev) => prev.map((pr) => (pr.exercise === editingPR.exercise ? { ...newPR } : pr))
        )
        setEditingPR(null)
      } else {
        const existingPRIndex = personalRecords.findIndex((pr) => pr.exercise === newPR.exercise)
        if (existingPRIndex >= 0) {
          setPersonalRecords(
            (prev) => prev.map((pr, index) => (index === existingPRIndex ? { ...newPR } : pr))
          )
        } else {
          setPersonalRecords((prev) => [...prev, { ...newPR }])
        }
      }

      setNewPR(
        { exercise: "", weight: 0, reps: 0, date: new Date().toISOString().split("T")[0], notes: "" }
      )
      setShowPRDialog(false)
    }
  }

  const editPR = (pr) => {
    setNewPR({ ...pr })
    setEditingPR(pr)
    setShowPRDialog(true)
  }

  const handlePRCancel = () => {
    setShowPRDialog(false)
    setEditingPR(null)
    setNewPR({
      exercise: "",
      weight: 0,
      reps: 0,
      date: new Date().toISOString().split("T")[0],
      notes: "",
    })
  }

  useEffect(() => {
    if (!axios) return

    setLoading(true)
    axios
      .get("/api/trainers")
      .then((res) => {
        setTrainers(res.data.data || res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Errore nel caricamento degli allenatori:", err)
        setError("Errore nel caricamento degli allenatori")
        setLoading(false)
      })
  }, [axios])

  function prev() {
    setCurrentIndex((idx) => (idx === 0 ? trainers.length - 1 : idx - 1))
  }
  function next() {
    setCurrentIndex((idx) => (idx === trainers.length - 1 ? 0 : idx + 1))
  }

  if (loading)
    return (
      (<div className="flex items-center justify-center h-screen">
        <div
          className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>)
    );
  if (error) return <div>{error}</div>;

  return (
    (<SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 dark:text-[#FF3F3F] bg-background w-full bg-[#18191b]">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4 mr-2" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
          {/* Quick Actions */}
          <div className="flex gap-2 mb-4">
            <Button
              className="bg-[#FF3F3F] hover:bg-[#FF3F3F]/90"
              onClick={() => setShowWorkoutDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Workout
            </Button>

            <Button variant="outline" onClick={() => setShowPRDialog(true)}>
              <Trophy className="w-4 h-4 mr-2" />
              Add Personal Record
            </Button>
          </div>

          {/* Fitness Stats Overview */}
          <div className="grid gap-4 auto-rows-min md:grid-cols-4">
            <FitnessStatsCard
              icon={Dumbbell}
              title="Weekly Workouts"
              value={`${fitnessStats.completedWorkouts}/${fitnessStats.weeklyGoal}`}
              progress={(fitnessStats.completedWorkouts / fitnessStats.weeklyGoal) * 100}
              buttonText="Add Workout"
              onButtonClick={() => setShowWorkoutDialog(true)}
              description={`${fitnessStats.weeklyGoal - fitnessStats.completedWorkouts} more to reach goal`} />

            <FitnessStatsCard
              icon={Flame}
              title="Calories Burned"
              value={fitnessStats.caloriesBurned}
              progress={(fitnessStats.caloriesBurned / fitnessStats.weeklyCalorieGoal) * 100}
              description={`${fitnessStats.weeklyCalorieGoal - fitnessStats.caloriesBurned} left this week`} />

            <FitnessStatsCard
              icon={Trophy}
              title="Current Streak"
              value={`${fitnessStats.currentStreak} days`}
              buttonText="Log Workout"
              onButtonClick={() => setShowWorkoutDialog(true)}
              description="Keep it up! 💪" />

            <FitnessStatsCard
              icon={Activity}
              title="Total Workouts"
              value={fitnessStats.totalWorkouts}
              description="All time sessions" />
          </div>

          {/* Workout Tracking & Personal Records */}
          <div className="grid gap-4 md:grid-cols-2">
            <WorkoutTrackingCard workouts={workouts} />
            <PersonalRecordsCard personalRecords={personalRecords} onEditPR={editPR} />
          </div>

          {/* Exercise Guide */}
          <ExerciseGuideCard />

          {/* Supplements Guide */}
          <SupplementsGuideCard />

          {/* Trainer Section */}
          <TrainerCard
            trainers={trainers}
            currentIndex={currentIndex}
            onPrev={prev}
            onNext={next}
            placeholder={placeholder} />

          <FitnessRecepieCarousel />
        </div>

        {/* Dialogs */}
        <WorkoutDialog
          open={showWorkoutDialog}
          onOpenChange={setShowWorkoutDialog}
          newWorkout={newWorkout}
          setNewWorkout={setNewWorkout}
          newExercise={newExercise}
          setNewExercise={setNewExercise}
          onAddExercise={addExerciseToWorkout}
          onSaveWorkout={saveWorkout} />

        <PRDialog
          open={showPRDialog}
          onOpenChange={setShowPRDialog}
          newPR={newPR}
          setNewPR={setNewPR}
          editingPR={editingPR}
          onSavePR={savePR}
          onCancel={handlePRCancel} />
      </SidebarInset>
    </SidebarProvider>)
  );
}
