"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { MoreHorizontal, Calendar, Clock, User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import { updateSessionStatusAction } from "@/actions/booking.action";

export default function TutorSessionsTable({ sessions }: { sessions: any[] }) {

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "COMPLETED":
                return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none rounded-lg">Completed</Badge>;
            case "CANCELLED":
                return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-none rounded-lg">Cancelled</Badge>;
            default:
                return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none rounded-lg">{status}</Badge>;
        }
    };



    const handleStatusUpdate = async (id: string, status: string) => {
        const res = await updateSessionStatusAction(id, status);

        if (res.success) {
            toast.success(`Session marked as ${status.toLowerCase()}`);
        } else {
            toast.error(res.error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Session Logs</h1>
                    <p className="text-gray-500">View and manage all your student bookings.</p>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow className="hover:bg-transparent border-b-gray-100">
                            <TableHead className="w-[250px] py-5 pl-8">Student</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time Slot</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right pr-8">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sessions.map((session) => (
                            <TableRow key={session.id} className="hover:bg-gray-50/50 border-b-gray-50 transition-colors">
                                {/* Student Info */}
                                <TableCell className="py-4 pl-8">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={session.student.image || "/avatar.png"}
                                            alt=""
                                            className="w-10 h-10 rounded-xl object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900">{session.student.name}</span>
                                            <span className="text-xs text-gray-500">{session.student.email}</span>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Date */}
                                <TableCell>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar size={14} className="text-blue-500" />
                                        {format(new Date(session.timeSlot.date), "MMM dd, yyyy")}
                                    </div>
                                </TableCell>

                                {/* Time */}
                                <TableCell>
                                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                                        <Clock size={14} className="text-blue-500" />
                                        {format(new Date(session.timeSlot.startTime), "p")}
                                    </div>
                                </TableCell>

                                {/* Status */}
                                <TableCell>
                                    {getStatusBadge(session.status)}
                                </TableCell>

                                {/* Actions Dropdown */}
                                <TableCell className="text-right pr-8">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="rounded-xl w-40">
                                            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                            <DropdownMenuItem
                                                onClick={() => handleStatusUpdate(session.id, "COMPLETED")}
                                                className="cursor-pointer text-emerald-600 focus:bg-emerald-50"
                                            >
                                                Mark Completed
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleStatusUpdate(session.id, "CONFIRMED")}
                                                className="cursor-pointer text-emerald-600 focus:bg-emerald-50"
                                            >
                                                Mark CONFIRMED
                                            </DropdownMenuItem>
                                            
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {sessions.length === 0 && (
                    <div className="py-20 text-center text-gray-400">
                        No session records found.
                    </div>
                )}
            </div>
        </div>
    );
}