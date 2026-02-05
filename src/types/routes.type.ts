import { LucideIcon } from "lucide-react"

export interface Routes {
        title: string,
        icon?: LucideIcon
        items: 
            {
                title:string,
                url: string,
                 icon?: LucideIcon
            }[]
    }
