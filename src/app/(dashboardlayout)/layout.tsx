import { AppSidebar } from "@/components/module/dashboard/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Roles } from "@/constants/roles"
import { userService } from "@/services/user.service"
import { redirect } from "next/navigation"

export default async function DashboardLayout(
  {
    admin, tutor, student
  }: {
    admin: React.ReactNode
    tutor: React.ReactNode
    student: React.ReactNode
  }
) {
  const { data } = await userService.getSession();

  if (!data.user) {
    redirect('/login')
  }
  const userRole = {
    role: data.user.role
  }

  let dashboardBody: React.ReactNode = null;

//  role base parallal route 
  if (userRole.role === Roles.ADMIN) {
    dashboardBody = admin;
  } else if (userRole.role === Roles.TUTOR) {
    dashboardBody = tutor
  } else if (userRole.role === Roles.STUDENT) {
    dashboardBody === student
  } else {
    redirect('/login')
  }

return(
  <SidebarProvider>
    <AppSidebar user={userRole} />
    <SidebarInset>
      <header className="flex h-16 shrink-0 bg-primary-foreground items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
      </header>
      <main className="bg-primary-foreground min-h-screen">
        {
          dashboardBody
        }
      </main>
    </SidebarInset>
  </SidebarProvider>
  )
}
