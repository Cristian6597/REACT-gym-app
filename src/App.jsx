"use client";

import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Trophy, Dumbbell, Activity } from "lucide-react";
import placeholder from "@/assets/placeholder1.jpg";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from "@/components/app-sidebar";
import { FitnessRecepieCarousel } from "./components/FitnessRecepieCarousel";

// Import custom components
import { FitnessStatsCard } from "./components/fitness-stats-card";
import { PersonalRecordsCard } from "./components/personal-records-card";
import { ExerciseGuideCard } from "./components/exercise-guide-card";
import { SupplementsGuideCard } from "./components/supplements-guide-card";
import { TrainerCard } from "./components/trainer-card";
import { PRDialog } from "./components/pr-dialog";

import { useAxios } from "./context/AxiosProvider";

export default function Page() {
  const axios = useAxios();
  const [trainers, setTrainers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simple counters
  const [weeklyWorkouts, setWeeklyWorkouts] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);

  // Personal Records state
  const [personalRecords, setPersonalRecords] = useState([]);
  const [showPRDialog, setShowPRDialog] = useState(false);
  const [editingPR, setEditingPR] = useState(null);

  // PR Form state
  const [newPR, setNewPR] = useState({
    exercise: "",
    weight: 0,
    reps: 0,
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedWeeklyWorkouts = localStorage.getItem("gym-weekly-workouts");
    const savedStreak = localStorage.getItem("gym-current-streak");
    const savedTotalWorkouts = localStorage.getItem("gym-total-workouts");
    const savedPRs = localStorage.getItem("gym-personal-records");

    if (savedWeeklyWorkouts) {
      setWeeklyWorkouts(Number.parseInt(savedWeeklyWorkouts));
    }
    if (savedStreak) {
      setCurrentStreak(Number.parseInt(savedStreak));
    }
    if (savedTotalWorkouts) {
      setTotalWorkouts(Number.parseInt(savedTotalWorkouts));
    }
    if (savedPRs) {
      setPersonalRecords(JSON.parse(savedPRs));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("gym-weekly-workouts", weeklyWorkouts.toString());
  }, [weeklyWorkouts]);

  useEffect(() => {
    localStorage.setItem("gym-current-streak", currentStreak.toString());
  }, [currentStreak]);

  useEffect(() => {
    localStorage.setItem("gym-total-workouts", totalWorkouts.toString());
  }, [totalWorkouts]);

  useEffect(() => {
    localStorage.setItem(
      "gym-personal-records",
      JSON.stringify(personalRecords)
    );
  }, [personalRecords]);

  // Simple increment functions
  const incrementWeeklyWorkouts = () => {
    setWeeklyWorkouts((prev) => prev + 1);
    setTotalWorkouts((prev) => prev + 1);
  };

  const incrementStreak = () => {
    setCurrentStreak((prev) => prev + 1);
    // Rimuovi questa riga: setTotalWorkouts((prev) => prev + 1)
  };

  const savePR = () => {
    if (newPR.exercise && newPR.weight > 0 && newPR.reps > 0) {
      if (editingPR) {
        setPersonalRecords((prev) =>
          prev.map((pr) =>
            pr.exercise === editingPR.exercise ? { ...newPR } : pr
          )
        );
        setEditingPR(null);
      } else {
        const existingPRIndex = personalRecords.findIndex(
          (pr) => pr.exercise === newPR.exercise
        );
        if (existingPRIndex >= 0) {
          setPersonalRecords((prev) =>
            prev.map((pr, index) =>
              index === existingPRIndex ? { ...newPR } : pr
            )
          );
        } else {
          setPersonalRecords((prev) => [...prev, { ...newPR }]);
        }
      }

      setNewPR({
        exercise: "",
        weight: 0,
        reps: 0,
        date: new Date().toISOString().split("T")[0],
        notes: "",
      });
      setShowPRDialog(false);
    }
  };

  const editPR = (pr) => {
    setNewPR({ ...pr });
    setEditingPR(pr);
    setShowPRDialog(true);
  };

  const handlePRCancel = () => {
    setShowPRDialog(false);
    setEditingPR(null);
    setNewPR({
      exercise: "",
      weight: 0,
      reps: 0,
      date: new Date().toISOString().split("T")[0],
      notes: "",
    });
  };

  useEffect(() => {
    if (!axios) return;

    setLoading(true);
    axios
      .get("/api/trainers")
      .then((res) => {
        setTrainers(res.data.data || res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore nel caricamento degli allenatori:", err);
        setError("Errore nel caricamento degli allenatori");
        setLoading(false);
      });
  }, [axios]);

  function prev() {
    setCurrentIndex((idx) => (idx === 0 ? trainers.length - 1 : idx - 1));
  }
  function next() {
    setCurrentIndex((idx) => (idx === trainers.length - 1 ? 0 : idx + 1));
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  if (error) return <div>{error}</div>;

  const weeklyGoal = 5;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 dark:text-[#FF3F3F] bg-background w-full bg-[#18191b]">
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
            <Button variant="outline" onClick={() => setShowPRDialog(true)}>
              <Trophy className="w-4 h-4 mr-2" />
              Add Personal Record
            </Button>
          </div>

          {/* Fitness Stats Overview */}
          <div className="grid gap-4 auto-rows-min md:grid-cols-3">
            <FitnessStatsCard
              icon={Dumbbell}
              title="Weekly Workouts"
              value={`${weeklyWorkouts}/${weeklyGoal}`}
              progress={(weeklyWorkouts / weeklyGoal) * 100}
              buttonText="+1 Workout"
              onButtonClick={incrementWeeklyWorkouts}
              description={`${Math.max(
                0,
                weeklyGoal - weeklyWorkouts
              )} more to reach goal`}
            />

            <FitnessStatsCard
              icon={Trophy}
              title="Current Streak"
              value={`${currentStreak} days`}
              buttonText="+1 Day"
              onButtonClick={incrementStreak}
              description="Keep it up! 💪"
            />

            <FitnessStatsCard
              icon={Activity}
              title="Total Workouts"
              value={totalWorkouts}
              description="All time sessions"
            />
          </div>

          {/* Personal Records */}
          <div className="grid gap-4 md:grid-cols-1">
            <PersonalRecordsCard
              personalRecords={personalRecords}
              onEditPR={editPR}
            />
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
            placeholder={placeholder}
          />

          <FitnessRecepieCarousel />
        </div>

        {/* PR Dialog */}
        <PRDialog
          open={showPRDialog}
          onOpenChange={setShowPRDialog}
          newPR={newPR}
          setNewPR={setNewPR}
          editingPR={editingPR}
          onSavePR={savePR}
          onCancel={handlePRCancel}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
