import EditProfileModal from "@/components/module/dashboard/updateProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { studentService } from "@/services/student.service";
import { userService } from "@/services/user.service";
import { BadgeCheck, Calendar, Clock, Mail, ShieldCheck } from "lucide-react";


export default async function StudentDashboardPage() {

    const { data } = await userService.getSession();
    const studentId = data.user.id
    console.log(data.user)

    const { data: student } = await studentService.getStudentById(studentId)
    console.log(student)

    const formattedDate = new Date(student.createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="p-6 lg:p-10 space-y-8 max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-sm">
                <Avatar className="h-24 w-24 border-4 border-blue-50 ring-4 ring-white shadow-sm">
                    <AvatarImage src={student.image || ""} alt={student.name} />
                    <AvatarFallback className="bg-blue-600 text-white text-3xl font-bold">
                        {student.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="text-center md:text-left space-y-2 flex-1">
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                        <h1 className="text-3xl font-extrabold text-gray-900">{student.name}</h1>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1 rounded-full font-bold">
                            {student.role}
                        </Badge>
                    </div>
                    <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2">
                        <Mail className="h-4 w-4" /> {student.email}
                    </p>
                </div>

                <div className="flex gap-2">
                    {!student.isBan ? (
                        <Badge className="bg-green-100 text-green-700 border-none px-4 py-2 rounded-xl flex gap-2">
                            <ShieldCheck className="h-4 w-4" /> Active Account
                        </Badge>
                    ) : (
                        <Badge variant="destructive" className="px-4 py-2 rounded-xl">Banned</Badge>
                    )}
                </div>
            </div>

            {/* Stats/Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Info Card 1 */}
                <Card className="rounded-2xl border-2 border-gray-100 shadow-none hover:border-blue-200 transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold text-gray-600 uppercase">Member Since</CardTitle>
                        <Calendar className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        {formattedDate}
                    </CardContent>
                </Card>

                {/* Info Card 2 */}


                {/* Info Card 3 */}
                <Card className="rounded-2xl border-2 border-gray-100 shadow-none hover:border-blue-200 transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold text-gray-600 uppercase">Last Updated</CardTitle>
                        <Clock className="h-5 w-5 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold text-gray-800">
                            {new Date(student.updatedAt).toLocaleDateString()}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Account ID Footer */}
            <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="text-xs font-mono text-gray-400">UID: {student.id}</span>
                <EditProfileModal student={{id: student.id, name: student.name, image: student.image }} />
                {/* <button className="text-sm font-bold text-blue-600 hover:underline">Edit Profile Settings</button> */}
            </div>
        </div>
    );
}



