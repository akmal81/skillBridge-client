import { userService } from "@/services/user.service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

export default async function AdminDashboardPage() {
    const { data } = await userService.getAllUser();


    async function handleBanUnban(userId: string) {
        "use server";  //
        await userService.updateUserStatus(userId); 
        revalidatePath("/admin/dashboard"); 
    }

    return (
        <div className="p-6 lg:p-10 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">User Management</h1>
                    
                </div>
                <Badge variant="outline" className="text-lg py-1 px-4">
                    Total Users: {data.length}
                </Badge>
            </div>

            <div className="rounded-2xl border-2 border-gray-100 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b-2 border-gray-100">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600">User Info</th>
                                <th className="p-4 font-semibold text-gray-600">Role</th>
                                <th className="p-4 font-semibold text-gray-600">Joined Date</th>
                                <th className="p-4 font-semibold text-gray-600">Status</th>
                                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.map((user: any) => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Badge className={
                                            user.role === "TUTOR"
                                                ? "bg-purple-100 text-purple-700 hover:bg-purple-100"
                                                : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                        }>
                                            {user.role}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-gray-600 text-sm">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        {user.isBan ? (
                                            <span className="flex items-center text-red-600 text-sm font-medium">
                                                <span className="h-2 w-2 rounded-full bg-red-600 mr-2"></span>
                                                Banned
                                            </span>
                                        ) : (
                                            <span className="flex items-center text-green-600 text-sm font-medium">
                                                <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                                                Active
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        {/* <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 font-semibold">
                                            Edit
                                        </Button> */}
                                       <form action={handleBanUnban.bind(null, user.id)}>
                                            <Button 
                                                type="submit"
                                                variant="ghost" 
                                                size="sm" 
                                                className={`font-semibold ${user.isBan ? "text-green-600" : "text-red-600"}`}
                                            >
                                                {user.isBan ? "Unban User" : "Ban User"}
                                            </Button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


