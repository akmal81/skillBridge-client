import { Calendar, ClockCheck, StarIcon, User } from "lucide-react";

export const tutorRoutes = [
    {
        title: "Tutor Dashboard",
        
        items: [
            {
                title: "Profile",
                url: "#",
                icon:User
            },
            {
                title: "Set Availability",
                url: "#",
                icon:ClockCheck
            },
            {
                title: "My Session",
                url: "#",
                icon:Calendar
            },
            {
                title: "My Reviews",
                url: "#",
                icon:StarIcon
            },
        ],
    },
]