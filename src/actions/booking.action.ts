"use server";

import { bookingService } from "@/services/bookings.service";
import { CreateBooking } from "@/types/bookings.type";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function cancelBookingAction(bookingId: string) {
    const result = await bookingService.updateBookingToCancel(bookingId);
    
    if (result.data) {
        revalidatePath("/dashboard/student/bookings"); // পেজ রিফ্রেশ করার জন্য
    }
    
    return result;
}





export async function updateSessionStatusAction(bookingId: string, status: string) {
  try {
    const cookieStore = await cookies();
    const res = await bookingService.updateBookingStatus(
      bookingId, 
      status, 
      cookieStore.toString()
    );

    if (res.error) return { success: false, error: res.error };

    
    revalidatePath("/dashboard/tutor/sessions");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}


export async function createBooking(bookingData:CreateBooking){
  return await bookingService.createBooking(bookingData);
}