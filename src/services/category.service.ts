import { env } from "@/env"
import { Category } from "@/types";
import { CreateCatgory } from "@/types/category.type";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const categoryService = {
    getAllCagetories: async function () {
        try {
            const res = await fetch(`${API_URL}/categories`)

            const data = await res.json();

            return { data: data, error: null }

        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },


    createCategory: async (categoryData: { catName: string; description: string }) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/admin/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(categoryData),
            });

            const data = await res.json();


            if (!res.ok) {
                console.log(data.message)
                return {
                    data: null,
                    error: { message: data.message || "Failed to create category" }
                };
            }

            return {
                data: data,
                error: null
            };

        } catch (error: any) {
            console.error("Category Creation Error:", error);
            return {
                data: null,
                error: { message: "Something Went Wrong Connection to Server" }
            };
        }
    },
   deleteCategory: async (categoryId: string) => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${API_URL}/admin/categories/${categoryId}`, {
            method: "DELETE",
            headers: {
            
                Cookie: cookieStore.toString()
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                data: null,
                error: { message: data.message || "Failed to delete category" }
            };
        }

        return {
            data: data,
            error: null
        };
    } catch (error: any) {
        console.error("Delete Category Error:", error);
        return { 
            data: null, 
            error: { message: "Server connection failed" } 
        };
    }
}

}