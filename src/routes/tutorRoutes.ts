import { Calendar, ClockCheck, StarIcon, User } from "lucide-react";

export const tutorRoutes = [
    {
        title: "Tutor Dashboard",
        
        items: [
            {
                title: "Profile",
                url: "/tutor/dashboard",
                icon:User
            },
            {
                title: "Set Availability",
                url: "/tutor/dashboard/set-availability",
                icon:ClockCheck
            },
            {
                title: "My Session",
                url: "/tutor/dashboard/tutor-session",
                icon:Calendar
            },
            {
                title: "My Reviews",
                url: "/tutor/dashboard/tutor-reviews",
                icon:StarIcon
            },
        ],
    },
]