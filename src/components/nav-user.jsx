"use client";

import { Bell, ChevronsUpDown, LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useUser } from "@/context/UserProvider"; // ← importa useUser

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();
  const { user } = useUser();

  if (!user) return null; // non mostrare nulla se non loggato

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mr-2"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="w-8 h-8 rounded-lg">
                <AvatarImage
                  src={user.avatar || "/placeholder.svg"}
                  alt={`${user.first_name} ${user.last_name}`}
                />
                <AvatarFallback className="rounded-lg">
                  {user.first_name?.[0] ?? "U"}
                  {user.last_name?.[0] ?? ""}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-sm leading-tight text-left">
                <span className="font-semibold truncate">
                  {user.first_name} {user.last_name}
                </span>
                <span className="text-xs truncate">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="w-8 h-8 rounded-lg">
                  <AvatarImage
                    src={user.avatar || "/placeholder.svg"}
                    alt={`${user.first_name} ${user.last_name}`}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.first_name?.[0] ?? "U"}
                    {user.last_name?.[0] ?? ""}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm leading-tight text-left">
                  <span className="font-semibold">
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link to="/client_profile">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
