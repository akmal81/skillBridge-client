import { env } from "@/env";
import { headers } from "next/headers";


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

}