import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { MessageCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import { useAxios } from "./context/AxiosProvider"; // importa il hook
import { Progress } from "@radix-ui/react-progress";

export default function Page() {
  const axios = useAxios(); // prendi l’istanza axios dal contesto
  const [trainers, setTrainers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!axios) return; // aspetta che axios sia pronto

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
  /*   if (trainers.length === 0) return <div>Nessun allenatore disponibile.</div>; */

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
          <div className="grid gap-4 auto-rows-min md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Today Workout</CardTitle>
                <CardDescription>Chest & Triceps</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span>Bench Press</span>
                    <span>3 sets × 10 reps</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Incline Dumbbell Press</span>
                    <span>3 sets × 12 reps</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tricep Pushdowns</span>
                    <span>3 sets × 15 reps</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>May 13 - May 19</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span>Workouts Completed</span>
                    <span>3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <div className="flex justify-between">
                    <span>Weekly Goal</span>
                    <span>60%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Personal Records</CardTitle>
                <CardDescription>Latest achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span>Bench Press</span>
                    <span>225 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Squat</span>
                    <span>315 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deadlift</span>
                    <span>405 lbs</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
          {/* Qui mantieni gli altri card come prima */}

          <Card className="min-h-[50vh] flex flex-row gap-4 p-4">
            <div className="relative flex items-center justify-center w-1/3">
              <button
                onClick={prev}
                className="absolute left-0 z-10 px-3 py-2 text-2xl transition rounded-full hover:bg-gray-200"
                aria-label="Previous trainer"
              >
                ←
              </button>

              <div className="flex flex-col items-center space-y-4">
                <img
                  src={"/placeholder.svg"}
                  alt={`${trainers[currentIndex].first_name} ${trainers[currentIndex].last_name}`}
                  className="object-cover w-40 h-40 rounded-full shadow-lg"
                />
                <div className="font-semibold text-center">
                  {trainers[currentIndex].first_name}{" "}
                  {trainers[currentIndex].last_name}
                </div>

                <Link to="/message">
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Chat with trainer
                  </Button>
                </Link>
              </div>

              <button
                onClick={next}
                className="absolute right-0 z-10 px-3 py-2 text-2xl transition rounded-full hover:bg-gray-200"
                aria-label="Next trainer"
              >
                →
              </button>
            </div>

            <div className="flex flex-col justify-center flex-1">
              <CardHeader>
                <CardTitle>Choose your trainer</CardTitle>
                <CardDescription>
                  Select from our list of professional trainers to help you
                  reach your fitness goals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Browse through our trainers' profiles and pick the one that
                  fits your style and preferences.
                </p>
                {/* Qui i dati del trainer */}
                <div className="mt-4 space-y-2">
                  <p>
                    <strong>Specialty:</strong>{" "}
                    {trainers[currentIndex].specialty || "N/A"}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {trainers[currentIndex].bio || "No description available."}
                  </p>
                  <p>
                    <strong>Experience:</strong>{" "}
                    {trainers[currentIndex].years_experience} years
                  </p>
                  <p>
                    <strong>Email:</strong> {trainers[currentIndex].email}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {trainers[currentIndex].phone || "Not provided"}
                  </p>
                  <p>
                    <strong>Birth Date:</strong>{" "}
                    {trainers[currentIndex].birth_date || "Unknown"}
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>
          <FitnessRecepieCarousel />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
