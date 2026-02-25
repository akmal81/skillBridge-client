"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { reviewsService } from "@/services/reviews.service";

export async function submitReviewAction(payload: { 
  tutorId: string; 
  studentId: string; 
  review: string; 
  rating: number 
}) {
  try {
    
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

  
    const data = await reviewsService.createReview(payload, cookieString);

   
    revalidatePath("/dashboard/student/my-bookings");
    
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}