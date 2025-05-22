import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const trainers = [
  {
    id: "1",
    name: "John Smith",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    name: "Michael Williams",
    photo: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    id: "4",
    name: "Emma Brown",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "5",
    name: "David Miller",
    photo: "https://randomuser.me/api/portraits/men/78.jpg",
  },
];

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function prev() {
    setCurrentIndex((idx) => (idx === 0 ? trainers.length - 1 : idx - 1));
  }
  function next() {
    setCurrentIndex((idx) => (idx === trainers.length - 1 ? 0 : idx + 1));
  }
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
          <Card className="min-h-[50vh] flex flex-row gap-4 p-4">
            {/* Left: Carousel with side buttons */}
            <div className="relative flex items-center justify-center w-1/3">
              {/* Left button */}
              <button
                onClick={prev}
                className="absolute left-0 z-10 px-3 py-2 text-2xl transition rounded-full hover:bg-gray-200"
                aria-label="Previous trainer"
              >
                ←
              </button>

              {/* Trainer photo */}
              <div className="flex flex-col items-center space-y-4">
                <img
                  src={trainers[currentIndex].photo || "/placeholder.svg"}
                  alt={trainers[currentIndex].name}
                  className="object-cover w-40 h-40 rounded-full shadow-lg"
                />
                <div className="font-semibold text-center">
                  {trainers[currentIndex].name}
                </div>

                <Link to="/message">
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Chat with trainer
                  </Button>
                </Link>
              </div>

              {/* Right button */}
              <button
                onClick={next}
                className="absolute right-0 z-10 px-3 py-2 text-2xl transition rounded-full hover:bg-gray-200"
                aria-label="Next trainer"
              >
                →
              </button>
            </div>

            {/* Right: Text */}
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
              </CardContent>
            </div>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
