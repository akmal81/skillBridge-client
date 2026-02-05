import { env } from "@/env"
import { SearchParams, ServiceOption } from "@/types"

const API_URL = env.API_URL

export const tutorService = {
    getTutors: async function (params?:SearchParams, options?:ServiceOption) {
        try {

            const url = new URL(`${API_URL}/tutor`)
            
            if(params){
                Object.entries(params).forEach(([key, value])=>{
                    if(value !==undefined && value !==null && value!==''){
                        url.searchParams.append(key,value)
                    }
                })
            }

            console.log(url.toString())

            const res = await fetch(url.toString())
            const data = await res.json()

            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    }
}