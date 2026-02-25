import { env } from "@/env";
import { ServiceOption } from "@/types";
import { cookies, headers } from "next/headers";


const API_URL = env.API_URL

export const studentService = {
    getStudentById: async function (studentsId: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/students/${studentsId}`, {

                method: "GET",
                headers: {

                    "Cookie": cookieStore.toString(),
                    "Content-Type": "application/json",
                },


            })
            const data = await res.json();

            if (!res.ok) {
                return { data: null, error: { message: data.message || "Unauthorized" } };
            }

            return { data: data, error: null }

        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }


    },


    updateStudentProfile: async (studentId: string, updateData: { name: string; image?: string }) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/students/${studentId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString()
                },
                body: JSON.stringify(updateData),
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: { message: data.message || "Failed to update profile" }
                };
            }

            return { data, error: null };
        } catch (error) {
            return { data: null, error: { message: "Server connection failed" } };
        }
    }
}