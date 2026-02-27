"use server";

import { tutorService } from "@/services/tutor.service";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

export async function createTutorAction(payload: {
  bio: string;
  image: string;
  subject: string;
  experience: number;
  course_price: number;
  categoryId: string;
}) {
  try {
  
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();


    const res = await tutorService.createTutor(payload, cookieString);

    if (res.error) {
      return { success: false, error: res.error };
    }

   
    revalidatePath("/tutors");
    revalidatePath("/dashboard/tutor/profile");

    return { success: true, data: res.data };
  } catch (error: any) {
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
}


export async function updateTutorAction(tutorId: string, payload: any) {
  try {
    const cookieStore = await cookies();
    const res = await tutorService.updateTutor(tutorId, payload, cookieStore.toString());

    if (res.error) return { success: false, error: res.error };

   
    revalidatePath("/tutor/dashboard");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}





export async function toggleAvailabilityAction(slotId: string, currentAvailability: boolean) {
  try {
  
    const newStatus = !currentAvailability;
    
    const res = await tutorService.updateTimeSlotAvailability(
      slotId,
      newStatus,
   
    );

    if (res.error) return { success: false, error: res.error };

    revalidatePath("/dashboard/tutor/time-slots");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}


export async function getTutorByUserId(userId: string) {
  try {
    const res = await tutorService.getTutorByUserId(userId);
    return { success: true, data: res.data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}



export async function createTimeSlotAction(data: {
    date: string;
    startTime: string;
    endTime: string;
    tutorId: string;
}) {
    try {
        const formattedDates = `${data.date}T00:00:00`; 
        const formattedStartTime = `${data.date}T${data.startTime}:00`;
        const formattedEndTime = `${data.date}T${data.endTime}:00`;

       
        const response = await tutorService.createTimeSlot({
            tutorId: data.tutorId,
            date: formattedDates,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
        });

        if (!response.success) throw new Error(response.error);

        revalidatePath("/dashboard/tutor/time-slots");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}