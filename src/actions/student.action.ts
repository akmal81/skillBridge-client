"use server";

import { studentService } from "@/services/student.service";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(studentId: string, values: { name: string; image?: string }) {
    
    const result = await studentService.updateStudentProfile(studentId, values);

    if (result.error) {
        return { success: false, message: result.error.message };
    }

    
    revalidatePath("/dashboard/student");
    
    return { success: true, message: "Profile updated successfully" };
}