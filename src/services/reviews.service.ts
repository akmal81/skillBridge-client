import { env } from "@/env"
import { ServiceOption } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const reviewsService = {
  getAllCagetories: async function () {
    try {
      const res = await fetch(`${API_URL}/reviews`)

      const data = await res.json();

      return { data: data, error: null }

    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } }
    }
  },



  createReview: async (payload: any, cookieString: string) => {
    const res = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieString,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to submit review");

    return result;
  },


  getReviewsByTutorId: async function (tutorId: string) {
  try {
    const res = await fetch(`${API_URL}/reviews/${tutorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 } 
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch reviews");
    }

     return { data: data, error: null }

  } catch (error: any) {
     return { data: null, error: { message: "Something went wrong" } }
  }
}


}
  


