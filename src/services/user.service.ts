import { env } from "@/env"
import { cookies } from "next/headers"
import { headers } from "next/headers";


const AUTH_URL = env.AUTH_URL
const API_URL = env.API_URL

export const userService = {
    getSession: async function () {

        try {

            // get cookie from browser cookie
            const cookieStore = await cookies();

            // getting session from database sesstion table 
            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString()
                },
                cache: "no-store"
            }
            );
            const session = await res.json();

            if (session === null) {
                return {
                    data: null,
                    error: { message: "Session is missing" }
                }
            }
            return {
                data: session,
                error: null
            }
        } catch (error) {
            return {
                data: null,
                error: { message: "Something went wrong" }
            }
        }
    },



    getAllUser: async function () {
        try {
            const url = new URL(`${API_URL}/admin/users`);

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


    updateUserStatus: async function (userId: string) {
    try {
       
        const { headers } = await import("next/headers"); 
        
        const res = await fetch(`${API_URL}/admin/users/${userId}`, {
            method: "PATCH",
            headers: Object.fromEntries(await headers()), 
        });

        const data = await res.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: "Something went wrong" };
    }
}
}