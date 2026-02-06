import { env } from "@/env"
import { SearchParams, ServiceOption } from "@/types"

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

    // featured turor
    getFeaturedTutor: async function (options?: ServiceOption) {
        try {
            const res = await fetch(`${API_URL}/tutor/featured`, options)

            const data = await res.json();

            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    }


}