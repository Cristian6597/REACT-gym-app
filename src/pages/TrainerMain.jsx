import { useEffect, useState } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAxios } from "@/context/AxiosProvider";

export default function TrainerMain() {
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
      </SidebarInset>
    </SidebarProvider>
  );
}
