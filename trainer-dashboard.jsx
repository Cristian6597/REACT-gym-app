import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, CalendarIcon, TrendingUp, Dumbbell, Clock, Target, Plus } from "lucide-react"

// Dati mock per il dashboard
const mockData = {
  stats: {
    totalClients: 24,
    todaySessions: 6,
    weeklyRevenue: 1250,
    completionRate: 87,
  },
  todayAppointments: [
    {
      id: 1,
      client: "Marco Rossi",
      time: "09:00",
      type: "Personal Training",
      focus: "Forza",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      client: "Laura Bianchi",
      time: "10:30",
      type: "Valutazione",
      focus: "Dimagrimento",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      client: "Giuseppe Verde",
      time: "14:00",
      type: "Personal Training",
      focus: "Forza",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      client: "Anna Neri",
      time: "16:00",
      type: "Follow-up",
      focus: "Resistenza",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
  clientsPR: [
    {
      id: 1,
      name: "Marco Rossi",
      exercise: "Squat",
      currentPR: 120,
      previousPR: 115,
      improvement: 5,
      date: "2024-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Giuseppe Verde",
      exercise: "Panca Piana",
      currentPR: 95,
      previousPR: 90,
      improvement: 5,
      date: "2024-01-14",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Roberto Blu",
      exercise: "Stacco",
      currentPR: 140,
      previousPR: 135,
      improvement: 5,
      date: "2024-01-13",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  recentClients: [
    {
      id: 1,
      name: "Marco Rossi",
      goal: "Forza",
      progress: 78,
      lastSession: "Oggi",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Laura Bianchi",
      goal: "Dimagrimento",
      progress: 65,
      lastSession: "Ieri",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Giuseppe Verde",
      goal: "Forza",
      progress: 82,
      lastSession: "Oggi",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
}

export default function TrainerMain() {
  const [date, setDate] = useState(new Date())
  const [selectedTab, setSelectedTab] = useState("overview")

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

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clienti Totali</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockData.stats.totalClients}</div>
                <p className="text-xs text-muted-foreground">+2 dal mese scorso</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sessioni Oggi</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockData.stats.todaySessions}</div>
                <p className="text-xs text-muted-foreground">4 completate, 2 in programma</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ricavi Settimana</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€{mockData.stats.weeklyRevenue}</div>
                <p className="text-xs text-muted-foreground">+12% dalla settimana scorsa</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasso Completamento</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockData.stats.completionRate}%</div>
                <p className="text-xs text-muted-foreground">+5% dal mese scorso</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Panoramica</TabsTrigger>
              <TabsTrigger value="calendar">Calendario</TabsTrigger>
              <TabsTrigger value="pr-tracking">PR Clienti</TabsTrigger>
              <TabsTrigger value="clients">Clienti</TabsTrigger>
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
                    <CardDescription>
                      I tuoi appuntamenti per oggi, {new Date().toLocaleDateString("it-IT")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockData.todayAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-center space-x-4 rounded-lg border p-3">
                          <Avatar>
                            <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {appointment.client
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{appointment.client}</p>
                            <p className="text-sm text-muted-foreground">{appointment.type}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{appointment.focus}</Badge>
                            <div className="text-sm font-medium">{appointment.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Client Progress */}
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Progressi Recenti</CardTitle>
                    <CardDescription>Ultimi aggiornamenti dei tuoi clienti</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockData.recentClients.map((client) => (
                        <div key={client.id} className="flex items-center space-x-4">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={client.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {client.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{client.name}</p>
                            <div className="flex items-center space-x-2">
                              <Progress value={client.progress} className="flex-1 h-2" />
                              <span className="text-xs text-muted-foreground">{client.progress}%</span>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">{client.lastSession}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Calendario</CardTitle>
                    <CardDescription>Seleziona una data per vedere gli appuntamenti</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border" />
                  </CardContent>
                </Card>

                <Card className="col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Appuntamenti</CardTitle>
                      <CardDescription>
                        {date ? date.toLocaleDateString("it-IT") : "Seleziona una data"}
                      </CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Nuovo Appuntamento
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockData.todayAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="text-sm font-medium">{appointment.time}</div>
                            <Separator orientation="vertical" className="h-4" />
                            <div>
                              <p className="text-sm font-medium">{appointment.client}</p>
                              <p className="text-xs text-muted-foreground">{appointment.type}</p>
                            </div>
                          </div>
                          <Badge variant="outline">{appointment.focus}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pr-tracking" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5" />
                    Personal Records - Clienti Forza
                  </CardTitle>
                  <CardDescription>Ultimi PR raggiunti dai tuoi clienti con obiettivo forza</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Esercizio</TableHead>
                        <TableHead>PR Precedente</TableHead>
                        <TableHead>Nuovo PR</TableHead>
                        <TableHead>Miglioramento</TableHead>
                        <TableHead>Data</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockData.clientsPR.map((pr) => (
                        <TableRow key={pr.id}>
                          <TableCell className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={pr.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {pr.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{pr.name}</span>
                          </TableCell>
                          <TableCell>{pr.exercise}</TableCell>
                          <TableCell>{pr.previousPR} kg</TableCell>
                          <TableCell className="font-bold text-green-600">{pr.currentPR} kg</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              +{pr.improvement} kg
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(pr.date).toLocaleDateString("it-IT")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clients" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>I Tuoi Clienti</CardTitle>
                    <CardDescription>Panoramica di tutti i clienti attivi</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuovo Cliente
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {mockData.recentClients.map((client) => (
                      <Card key={client.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={client.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {client.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{client.name}</p>
                              <p className="text-sm text-muted-foreground">Obiettivo: {client.goal}</p>
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span>Progresso</span>
                                  <span>{client.progress}%</span>
                                </div>
                                <Progress value={client.progress} className="h-2" />
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                Ultima sessione: {client.lastSession}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>)
  );
}
