import {
  Activity,
  Calendar,
  Dumbbell,
  FlameIcon,
  LineChart,
  ListChecks,
  Settings2,
  Timer,
  Trophy,
  Bell,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavExercises } from "./nav-exercises";
import { NavUser } from "./nav-user";
import { PlanSwitcher } from "./plan-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

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
        {
          title: "Weekly Stats",
          url: "#",
        },
        {
          title: "Goals",
          url: "#",
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
          url: "#",
        },
        {
          title: "Create Workout",
          url: "/workoutplan",
        },
      ],
    },
    /* {
      title: "Progress",
      url: "#",
      icon: LineChart,
      items: [
        {
          title: "Body Metrics",
          url: "#",
        },
        {
          title: "Strength Gains",
          url: "#",
        },
        {
          title: "Personal Records",
          url: "#",
        },
        {
          title: "Progress Photos",
          url: "#",
        },
      ],
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Schedule",
          url: "#",
        },
        {
          title: "Upcoming Workouts",
          url: "#",
        },
      ],
    }, */
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
          url: "/messages",
        },
      ],
    },
  ],
  exercises: [
    /* {
      name: "Chest & Triceps",
      url: "#",
      icon: Dumbbell,
    },
    {
      name: "Back & Biceps",
      url: "#",
      icon: ListChecks,
    },
    {
      name: "Legs & Core",
      url: "#",
      icon: Trophy,
    }, */
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <PlanSwitcher plans={data.plans} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavExercises exercises={data.exercises} />
      </SidebarContent>
      <SidebarFooter className="w-full">
        <NavUser user={data.user} />
        <Link to="/trainer">
          <Button className="w-full">Collab with us</Button>
        </Link>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
