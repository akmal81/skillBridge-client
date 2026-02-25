"use server";

import { bookingService } from "@/services/bookings.service";
import { revalidatePath } from "next/cache";

export async function cancelBookingAction(bookingId: string) {
    const result = await bookingService.updateBookingToCancel(bookingId);
    
    if (result.data) {
        revalidatePath("/dashboard/student/bookings"); // পেজ রিফ্রেশ করার জন্য
    }
    
    return result;
}