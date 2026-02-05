"use server"

import { tutorService } from "@/services/tutor.service"
import { userService } from "@/services/user.service"

export const getSession = async()=>{
    return await userService.getSession()
}

export const getTutors = async()=>{
    return await tutorService.getTutors()
}