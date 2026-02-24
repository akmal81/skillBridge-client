import { Button } from "@/components/ui/button";
import { categoryService } from "@/services/category.service";
import { Trash2, FolderTree, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import AddCategoryModal from "@/components/module/dashboard/categoryModul";
import { revalidatePath } from "next/cache";

interface CategoryData {
    id: string;
    catName: string;
    tutors: number;
}

export default async function AdminCategoryPage() {

    const { data: categories } = await categoryService.getAllCagetories();

    console.log(categories.data)

    const handleDelete = async (id: string) => {
        "use server";

        const res = await categoryService.deleteCategory(id);

        if (res.error) {
            console.error(res.error.message);

        } else {

            revalidatePath("/admin/categories");
        }
    };
    return (
        <div className="p-6 lg:p-10 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Categories</h1>

                </div>
                {/* <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 flex gap-2">
                    <Plus className="h-4 w-4" /> Add Category
                </Button> */}

                <AddCategoryModal />
            </div>

            {/* Category Grid/List */}
            <div className="rounded-2xl border-2 border-gray-100 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b-2 border-gray-100">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Category Name</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Total Tutors</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {categories.data.map((cat: CategoryData) => (
                                <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                                <FolderTree className="h-5 w-5 text-secondary" />
                                            </div>
                                            <span className="font-bold text-gray-800 text-lg">{cat.catName}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Badge variant="secondary" className="bg-gray-100 text-gray-700 font-medium px-3 py-1">
                                            {cat.tutors} Tutors Active
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-right">
                                        <form action={handleDelete.bind(null, cat.id)}>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all rounded-lg"
                                                title="Delete Category"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {categories.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 font-medium"></p>
                </div>
            )}
        </div>
    );

}