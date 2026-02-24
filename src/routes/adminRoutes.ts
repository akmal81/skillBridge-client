import { Ban, File, User } from "lucide-react";

export const adminRoutes = [
    {
        title: "Admin Dashboard",


        items: [
            {
                title: "All Users",
                url: "/admin",
                icon: User
            },
            // {
            //     title: "Ban/Unban",
            //     url: "#",
            //     icon: Ban
            // },
            {
                title: "Bookings",
                url: "/admin/bookings",
            },
            {
                title: "Manage Categories",
                url: "/admin/category",
                icon:File
            },
        ],
    },
]