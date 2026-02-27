import { env } from "@/env";
import { cookies, headers } from "next/headers";


const API_URL = env.API_URL

export const bookingService = {
    getBookings: async function () {

        try {
            const url = new URL(`${API_URL}/admin/bookings`);

            const res = await fetch(url.toString(), {
                method: "GET",
                headers: Object.fromEntries(await headers()),
            });

            const data = await res.json();

            if (!res.ok) {
                return { data: null, error: { message: data.message || "Unauthorized" } };
            }


            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } };
        }
    },

    getBookingByStudentId: async function (studentId: string) {

        try {
            const url = new URL(`${API_URL}/bookings/student/${studentId}`);

            const res = await fetch(url.toString(), {
                method: "GET",
                headers: Object.fromEntries(await headers()),
            });

            const data = await res.json();

            if (!res.ok) {
                return { data: null, error: { message: data.message || "Unauthorized" } };
            }

            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } };
        }
    },
    getBookingBytutorId: async function (tutorId: string) {

        try {
            const url = new URL(`${API_URL}/bookings/tutor/${tutorId}`);

            const res = await fetch(url.toString(), {
                method: "GET",
                headers: Object.fromEntries(await headers()),
            });

            const data = await res.json();

            if (!res.ok) {
                return { data: null, error: { message: data.message || "Unauthorized" } };
            }

            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } };
        }
    },




    updateBookingToCancel: async function (bookingId: string) {
        try {

            const url = new URL(`${API_URL}/bookings/cancel/${bookingId}`);

            const res = await fetch(url.toString(), {
                method: "PATCH",
                headers: Object.fromEntries(await headers()),
            });

            const data = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: { message: data.message || "Failed to cancel booking" }
                };
            }

            return { data: data, error: null };
        } catch (error) {
            return {
                data: null,
                error: { message: "Something went wrong while cancelling" }
            };
        }
    },



    updateBookingStatus: async (bookingId: string, status: string, cookieString: string) => {
        try {
            console.log(status)
            const res = await fetch(`${API_URL}/bookings/complete/${bookingId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieString,
                },
                body: JSON.stringify({ status }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to update status");

            return { data: result, error: null };
        } catch (error: any) {
            return { data: null, error: error.message };
        }
    },

    createBooking: async function (bookingData: any) {

        try {
            const cookieStor = await cookies();

            const res = await fetch(`${API_URL}/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStor.toString()
                },
                body: JSON.stringify(bookingData),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to create booking");

            return { data: result, error: null };
        } catch (error: any) {
            return { data: null, error: error.message };
        }
    }
}