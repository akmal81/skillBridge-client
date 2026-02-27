import { env } from "@/env"
import { SearchParams, ServiceOption, TutorResponse } from "@/types"
import { cookies } from "next/headers"

const API_URL = env.API_URL

export const tutorService = {

    // tutor search
    getTutors: async function (params?: SearchParams, options?: ServiceOption) {
        try {

            const url = new URL(`${API_URL}/tutor`)

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== '') {
                        url.searchParams.append(key, value)
                    }
                })
            }

            const config: RequestInit = {}

            if (options?.cache) {
                config.cache = options.cache
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate }
            }




            const res = await fetch(url.toString(), config)
            const data = await res.json()

            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
    // tutor by id
    getTutorById: async function (params: string, options?: ServiceOption) {
        try {

            const res = await fetch(`${API_URL}/tutor/${params}`, options)
            const data = await res.json();

            return { data: data, error: null }

        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }

    },




    getTutorByUserId: async function (userId: string, options?: any) {

        try {
            const res = await fetch(`${API_URL}/tutor/user/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                ...options
            });

            if (!res.ok) {
                const errorData = await res.json();
                return {
                    data: null,
                    error: { message: errorData.message || "Tutor not found" }
                };
            }

            const data = await res.json();

            return { data: data, error: null }

        } catch (error: any) {
            console.error("Fetch Error:", error);
            return {
                data: null,
                error: { message: error.message || "Something went wrong" }
            };
        }
    },








    // featured turor
    getFeaturedTutor: async function (options?: ServiceOption) {
        try {
            const res = await fetch(`${API_URL}/tutor/featured`, options)

            const data = await res.json();

            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
    // get tutor by category

    getTutorByCategory: async function (params: string, options?: ServiceOption) {
        try {

            const res = await fetch(`${API_URL}/tutor/bycategory/${params}`, options)
            const data = await res.json();

            return { data: data, error: null }

        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }

    },


    getTutorsByCategory: async function (categoryId?: string): Promise<TutorResponse> {
        try {

            const url = categoryId
                ? `${API_URL}/tutor/bycategory/${categoryId}`
                : `${API_URL}/tutor`;

            const res = await fetch(url, {
                next: { revalidate: 60 }
            });

            if (!res.ok) {
                throw new Error("Failed to fetch tutors");
            }

            const result = await res.json();

            return { data: result, error: null };

        } catch (error: any) {
            console.error("Fetch Error:", error);
            return { data: null, error: error.message || "Something went wrong" };
        }
    },


    createTutor: async (payload: any, cookieString: string) => {
        try {
            const res = await fetch(`${API_URL}/tutor`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieString,
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to create tutor profile");
            }

            return { data: result, error: null };
        } catch (error: any) {
            return { data: null, error: error.message };
        }
    },


    updateTutor: async (tutorId: string, payload: any, cookieString: string) => {
        try {
            const res = await fetch(`${API_URL}/tutor/${tutorId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieString,
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Update failed");

            return { data: result, error: null };
        } catch (error: any) {
            return { data: null, error: error.message };
        }
    },


    getTimeSlotsByTutorId: async (tutorId: string) => {
        try {

          
            const cookieStore = await cookies();
            
            const res = await fetch(`${API_URL}/tutor/time-slot/${tutorId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },

                next: {
                    revalidate: 60,
                    tags: ["time-slots"],
                },
            });

            const result = await res.json();


            if (!res.ok) {
                throw new Error(result.message || "Failed to fetch time slots");
            }

            return {
                data: result,
                error: null,
            };
        } catch (error: any) {
            return {
                data: null,
                error: error.message || "Something went wrong",
            };
        }
    },


    updateTimeSlotAvailability: async (slotId: string, availability: boolean) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/tutor/available/${slotId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Cookie": cookieStore.toString(),
                    },
                    body: JSON.stringify({ availability }),
                    next: {
                        revalidate: 60,
                        tags: ["time-slots"],
                    },
                }
            )

            const result = await res.json();


            if (!res.ok) {
                throw new Error(result.message || "Failed to fetch time slots");
            }

            return {
                data: result,
                error: null,
            };

        } catch (error: any) {
            return { data: null, error: error.message }
        }
    },



    createTimeSlot: async (slotData: any) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value; 

        const res = await fetch(`${API_URL}/tutor/time-slot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            body: JSON.stringify(slotData),
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Failed");

        return { data: result, success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
},


}

