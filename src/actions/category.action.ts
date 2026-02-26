
"use server";
import { categoryService } from "@/services/category.service";
import { updateTag } from "next/cache";


export const createCategory = async (values: {catName: string, description: string }) => {

    const result = await categoryService.createCategory(values);

    if (result.error) {
        return { success: false, message: result.error.message };
    }

   
    updateTag("category")
    return { success: true };
}



export const getCategories = async()=>{
    return await categoryService.getAllCagetories()
}