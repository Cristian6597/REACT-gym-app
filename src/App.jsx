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

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
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
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
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
          <Card className="min-h-[50vh] flex-1 md:min-h-min">
            <CardHeader>
              <CardTitle>Monthly Progress</CardTitle>
              <CardDescription>Track your fitness journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-xl bg-muted/50"></div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
