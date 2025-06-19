import { useEffect, useState } from "react"
import { Dumbbell, MapPin, TrendingUp, Users, Award, Clock, Target } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { useAxios } from "@/context/AxiosProvider"

// Mock data - sostituire con dati reali dall'API
const mockGyms = [
  {
    id: 1,
    name: "FitZone Centro",
    address: "Via Roma 123, Milano",
    clients: 45,
    sessions: 120,
    status: "active",
  },
  {
    id: 2,
    name: "PowerGym Nord",
    address: "Corso Buenos Aires 456, Milano",
    clients: 32,
    sessions: 89,
    status: "active",
  },
  {
    id: 3,
    name: "BodyBuilding Pro",
    address: "Via Torino 789, Milano",
    clients: 28,
    sessions: 67,
    status: "maintenance",
  },
]

const mockBookings = [
  {
    id: 1,
    client: "Marco Rossi",
    date: "2024-12-20",
    time: "09:00",
    type: "Forza",
    gym: "FitZone Centro",
    status: "confirmed",
  },
  {
    id: 2,
    client: "Laura Bianchi",
    date: "2024-12-20",
    time: "10:30",
    type: "Cardio",
    gym: "PowerGym Nord",
    status: "confirmed",
  },
  {
    id: 3,
    client: "Giuseppe Verdi",
    date: "2024-12-20",
    time: "15:00",
    type: "Forza",
    gym: "FitZone Centro",
    status: "pending",
  },
  {
    id: 4,
    client: "Anna Neri",
    date: "2024-12-21",
    time: "08:00",
    type: "Functional",
    gym: "BodyBuilding Pro",
    status: "confirmed",
  },
]

const mockPRs = [
  {
    id: 1,
    client: "Marco Rossi",
    exercise: "Panca Piana",
    weight: 120,
    reps: 1,
    date: "2024-12-15",
    improvement: "+5kg",
  },
  {
    id: 2,
    client: "Giuseppe Verdi",
    exercise: "Squat",
    weight: 140,
    reps: 1,
    date: "2024-12-14",
    improvement: "+10kg",
  },
  {
    id: 3,
    client: "Laura Bianchi",
    exercise: "Stacco",
    weight: 90,
    reps: 1,
    date: "2024-12-13",
    improvement: "+7.5kg",
  },
  {
    id: 4,
    client: "Anna Neri",
    exercise: "Military Press",
    weight: 45,
    reps: 1,
    date: "2024-12-12",
    improvement: "+2.5kg",
  },
]

export default function TrainerMain() {
  const axios = useAxios()
  const [trainers, setTrainers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())

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

  const todayBookings = mockBookings.filter((booking) => booking.date === new Date().toISOString().split("T")[0])

  const totalClients = mockGyms.reduce((sum, gym) => sum + gym.clients, 0)
  const totalSessions = mockGyms.reduce((sum, gym) => sum + gym.sessions, 0)
  const recentPRs = mockPRs.slice(0, 3)

  if (loading)
    return (
      (<div className="flex items-center justify-center h-screen">
        <div
          className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>)
    );

  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    (<SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Stats Cards */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clienti Totali</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClients}</div>
                <p className="text-xs text-muted-foreground">+12% dal mese scorso</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sessioni Totali</CardTitle>
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSessions}</div>
                <p className="text-xs text-muted-foreground">+8% dal mese scorso</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Palestre Attive</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockGyms.filter((g) => g.status === "active").length}</div>
                <p className="text-xs text-muted-foreground">Su {mockGyms.length} totali</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">PR Questo Mese</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockPRs.length}</div>
                <p className="text-xs text-muted-foreground">+25% dal mese scorso</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Panoramica</TabsTrigger>
              <TabsTrigger value="gyms">Palestre</TabsTrigger>
              <TabsTrigger value="calendar">Calendario</TabsTrigger>
              <TabsTrigger value="prs">Personal Records</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Today's Schedule */}
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Programma di Oggi
                    </CardTitle>
                    <CardDescription>{todayBookings.length} sessioni programmate per oggi</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todayBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <div>
                              <p className="font-medium">{booking.client}</p>
                              <p className="text-sm text-muted-foreground">
                                {booking.type} - {booking.gym}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{booking.time}</p>
                            <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                              {booking.status === "confirmed" ? "Confermato" : "In attesa"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent PRs */}
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      PR Recenti
                    </CardTitle>
                    <CardDescription>Ultimi personal record raggiunti</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentPRs.map((pr) => (
                        <div key={pr.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{pr.client}</p>
                            <p className="text-sm text-muted-foreground">{pr.exercise}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">
                              {pr.weight}kg x{pr.reps}
                            </p>
                            <Badge variant="outline" className="text-green-600">
                              {pr.improvement}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="gyms" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockGyms.map((gym) => (
                  <Card key={gym.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {gym.name}
                        <Badge variant={gym.status === "active" ? "default" : "secondary"}>
                          {gym.status === "active" ? "Attiva" : "Manutenzione"}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {gym.address}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Clienti</span>
                        <span className="font-bold">{gym.clients}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Sessioni</span>
                        <span className="font-bold">{gym.sessions}</span>
                      </div>
                      <Progress value={(gym.sessions / 150) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {Math.round((gym.sessions / 150) * 100)}% capacità utilizzata
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Calendario</CardTitle>
                    <CardDescription>Seleziona una data per vedere le prenotazioni</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border" />
                  </CardContent>
                </Card>

                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Prenotazioni</CardTitle>
                    <CardDescription>Prenotazioni per {selectedDate?.toLocaleDateString("it-IT")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Orario</TableHead>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Palestra</TableHead>
                          <TableHead>Stato</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockBookings
                          .filter((booking) => booking.date === selectedDate?.toISOString().split("T")[0])
                          .map((booking) => (
                            <TableRow key={booking.id}>
                              <TableCell className="font-medium">{booking.time}</TableCell>
                              <TableCell>{booking.client}</TableCell>
                              <TableCell>{booking.type}</TableCell>
                              <TableCell>{booking.gym}</TableCell>
                              <TableCell>
                                <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                                  {booking.status === "confirmed" ? "Confermato" : "In attesa"}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="prs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Personal Records dei Clienti
                  </CardTitle>
                  <CardDescription>Tutti i personal record raggiunti dai tuoi clienti</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Esercizio</TableHead>
                        <TableHead>Peso</TableHead>
                        <TableHead>Ripetizioni</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Miglioramento</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPRs.map((pr) => (
                        <TableRow key={pr.id}>
                          <TableCell className="font-medium">{pr.client}</TableCell>
                          <TableCell>{pr.exercise}</TableCell>
                          <TableCell>{pr.weight}kg</TableCell>
                          <TableCell>{pr.reps}</TableCell>
                          <TableCell>{new Date(pr.date).toLocaleDateString("it-IT")}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-green-600">
                              {pr.improvement}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>)
  );
}
