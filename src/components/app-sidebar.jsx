import { useUser } from "@/context/UserProvider";
import { Activity, Bell, Dumbbell, FlameIcon, Timer } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { NavExercises } from "./nav-exercises";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { PlanSwitcher } from "./plan-switcher";
import { Button } from "./ui/button";

// This is sample data for a gym app
const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    stats: {
      workouts: 24,
      streak: 5,
    },
  },
  plans: [
    {
      name: "Strength Builder",
      logo: Dumbbell,
      level: "Intermediate",
    },
    {
      name: "Fat Loss",
      logo: FlameIcon,
      level: "Beginner",
    },
    {
      name: "Endurance",
      logo: Timer,
      level: "Advanced",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Activity,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/",
        },
      ],
    },
    {
      title: "Workouts",
      url: "#",
      icon: Dumbbell,
      items: [
        {
          title: "My Workouts",
          url: "/my-workouts",
        },
        {
          title: "Create Workout",
          url: "/create-workoutplan",
        },
      ],
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
      items: [
        {
          title: "Read Notifications",
          url: "/notifications",
        },
        {
          title: "Read Messages",
          url: "/message",
        },
      ],
    },
  ],
};
export function AppSidebar({ collapsible, ...props }) {
  const { user } = useUser();
  const filteredNavMain = data.navMain.map((section) => {
    if (section.title === "Workouts") {
      const items = section.items.filter((item) => {
        // Mostra "Create Workout" solo ai trainer
        if (item.title === "Create Workout") {
          return user?.role === "trainer";
        }

        // Mostra "My Workouts" solo se NON è trainer
        if (item.title === "My Workouts") {
          return user?.role !== "trainer";
        }

        return true;
      });

      return { ...section, items };
    }

    return section;
  });
  return (
    <Sidebar collapsible="icon" {...props} data-collapsible className="">
      <SidebarHeader>
        <div className="flex items-center justify-center w-full gap-2 p-2 border dark:border-[#FF3F3F] border-solid rounded-xl">
          <Dumbbell className="w-5 h-5 dark:text-[#FF3F3F]" />
          <h1 className="text-sm font-semibold whitespace-nowrap group-data-[collapsible=icon]:hidden">
            CoachConnect
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent className="">
        <NavMain items={filteredNavMain} />
      </SidebarContent>

      <SidebarFooter className="w-full">
        <NavUser
          user={data.user}
          className="group-data-[collapsible=icon]:[&_span]:hidden"
        />
        {user?.role === "client" && (
          <div className="group-data-[collapsible=icon]:hidden">
            <Link to="/register-trainer" className="w-full">
              <Button className="w-full">Join the Crew</Button>
            </Link>
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
