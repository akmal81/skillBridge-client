"use client"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { adminRoutes } from "@/routes/adminRoutes"
import { Routes } from "@/types"
import { Roles } from "@/constants/roles"
import { StudentRoutes } from "@/routes/studentRoutes"
import { tutorRoutes } from "@/routes/tutorRoutes"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"



export function AppSidebar({ user, ...props }: { user: { role: string } & React.ComponentProps<typeof Sidebar> }) {

  const pathname = usePathname();

  let routes: Routes[] = [];
  switch (user.role) {

    case Roles.ADMIN: routes = adminRoutes;
      break;
    case Roles.TUTOR: routes = tutorRoutes;
      break;
    case Roles.STUDENT: routes = StudentRoutes;
      break;

    default: routes = []
      break;
  }





  return (
    <Sidebar {...props} className="border-r-0 shadow-xl">
      <SidebarHeader className="h-16 flex items-center px-6 border-b">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        <Link href="/" className="flex items-center">
                        <h1 className="text-primary font-bold text-4xl">
                            Skill
                            <span className="text-secondary">
                                bridge
                            </span>
                            <span className="">.</span></h1>
                    </Link>
        </h1>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-6">
        {routes.map((item) => (
          <SidebarGroup key={item.title} className="p-0">
            <SidebarGroupLabel className="px-2 mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {item.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive} className="h-10">
                        <Link
                          href={item.url}
                          className={cn(
                            "flex items-center gap-3 px-3 rounded-lg transition-all duration-200",
                            isActive
                              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                              : "text-muted-foreground hover:bg-secondary hover:text-primary"
                          )}
                        >
                          {/* <span className="text-sm font-medium">{item.icon}</span> */}
                          <span className="text-sm font-medium">{item.title}</span>
                        </Link>
                        
                      </SidebarMenuButton>
                      
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
