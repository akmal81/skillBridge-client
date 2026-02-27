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
