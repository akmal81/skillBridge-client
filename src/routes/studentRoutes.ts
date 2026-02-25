import { CalendarCheck, User } from "lucide-react";

export const StudentRoutes = [
    {
        title: "Student Dashboard",
      
        items: [
            {
                title: "Profile",
                url: "/dashboard",
                icon:User
            },
            {
                title: "Bookings",
                url: "/dashboard/my-bookings",
                icon:CalendarCheck
            },
          
          
        ],
    },
]