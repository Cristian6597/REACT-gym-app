import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { MessageCircle } from "lucide-react";
import placeholder from "@/assets/placeholder1.jpg";

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

import { useAxios } from "./context/AxiosProvider";
import { Progress } from "@radix-ui/react-progress";

export default function Page() {
  const axios = useAxios();
  const [trainers, setTrainers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <div className="grid gap-4 auto-rows-min md:grid-cols-3">
            {/* Le tue card esistenti qui */}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
          <Card className="min-h-[50vh] flex flex-col md:flex-row items-center gap-4 p-4 dark:bg-[#18171B]">
            {/* Immagine e pulsanti */}
            <div className="relative flex flex-col items-center justify-center w-full md:w-1/3">
              {/* Pulsanti freccia desktop - ai lati */}
              <button
                onClick={prev}
                className="hidden md:flex absolute left-[-2rem] top-1/2 transform -translate-y-1/2 px-12 py-2 text-2xl rounded-full hover:bg-gray-200 transition"
                aria-label="Previous trainer"
              >
                ←
              </button>

              <img
                src={placeholder}
                alt={`${trainers[currentIndex]?.first_name} ${trainers[currentIndex]?.last_name}`}
                className="object-cover w-32 h-32 rounded-full shadow-lg md:w-40 md:h-40"
              />

              <div className="mt-4 font-semibold text-center">
                {trainers[currentIndex]?.first_name}{" "}
                {trainers[currentIndex]?.last_name}
              </div>

              <Link to="/message" className="w-full mt-2 md:w-auto">
                <Button
                  variant="outline"
                  className="flex items-center justify-center w-full gap-2 hover:text-[#FF3F3F] hover:border-[#FF3F3F] transition-colors bg-transparent shadow-none"
                >
                  <MessageCircle className="w-4 h-4 text-gray-500 hover:text-[#FF3F3F]" />
                  <span className="hidden sm:inline">Chat with trainer</span>
                  <span className="sm:hidden">Chat</span>
                </Button>
              </Link>

              {/* Pulsanti freccia mobile - sotto immagine */}
              <div className="flex gap-4 mt-4 md:hidden">
                <button
                  onClick={prev}
                  className="px-4 py-2 text-xl transition rounded-full hover:bg-gray-200"
                  aria-label="Previous trainer"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  className="px-4 py-2 text-xl transition rounded-full hover:bg-gray-200"
                  aria-label="Next trainer"
                >
                  →
                </button>
              </div>

              {/* Pulsante freccia desktop destra */}
              <button
                onClick={next}
                className="hidden md:flex absolute right-[-2rem] top-1/2 transform -translate-y-1/2 px-12 py-2 text-2xl rounded-full hover:bg-gray-200 transition"
                aria-label="Next trainer"
              >
                →
              </button>
            </div>

            {/* Info del trainer */}
            <div className="flex flex-col justify-center flex-1 w-full">
              <CardHeader>
                <CardTitle>
                  {trainers[currentIndex]?.user?.first_name}{" "}
                  {trainers[currentIndex]?.user?.last_name}
                </CardTitle>
                <CardDescription>
                  Select from our list of professional trainers to help you
                  reach your fitness goals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Browse through our trainers' profiles and pick the one that
                  fits your style and preferences.
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Specialty:</strong>{" "}
                    {trainers[currentIndex]?.specialty || "N/A"}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {trainers[currentIndex]?.bio || "No description available."}
                  </p>
                  <p>
                    <strong>Experience:</strong>{" "}
                    {trainers[currentIndex]?.years_experience} years
                  </p>
                  <p>
                    <strong>Email:</strong> {trainers[currentIndex]?.email}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {trainers[currentIndex]?.phone || "Not provided"}
                  </p>
                  <p>
                    <strong>Birth Date:</strong>{" "}
                    {trainers[currentIndex]?.birth_date || "Unknown"}
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
