"use client"; 

import { Badge } from "@/components/ui/badge";
import { 
  CalendarDays, 
  Clock, 
  CheckCircle2, 
  Timer, 
  XCircle, 
  BookOpen,
  ExternalLink
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { MyBooking } from "@/types"; 
import { cancelBookingAction } from "@/actions/booking.action";
import { Button } from "@/components/ui/button";
import { ReviewModal } from "./reviewModal";


function StatusBadge({ status }: { status: MyBooking['status'] }) {
    const styles: any = {
        COMPLETED: "bg-green-100 text-green-700 border-green-200",
        PENDING: "bg-orange-100 text-orange-700 border-orange-200",
        CANCELLED: "bg-red-50 text-red-600 border-red-100",
        CONFIRMED: "bg-blue-100 text-blue-700 border-blue-200"
    };

    const Icons: any = {
        COMPLETED: <CheckCircle2 className="h-3 w-3" />,
        PENDING: <Timer className="h-3 w-3" />,
        CANCELLED: <XCircle className="h-3 w-3" />,
        CONFIRMED: <CheckCircle2 className="h-3 w-3" />
    };

    return (
        <Badge className={`${styles[status]} px-3 py-1 rounded-full border-2 flex items-center gap-1.5 w-fit mx-auto shadow-none font-black text-[10px] uppercase`} variant="outline">
            {Icons[status]}
            {status}
        </Badge>
    );
}

export function BookingTable({ data, isHistory = false }: { data: MyBooking[], isHistory?: boolean }) {
    if (data.length === 0) {
        return (
            <div className="p-12 text-center text-gray-400 font-medium italic bg-gray-50/50">
               
            </div>
        );
    }

    const handleCancel = async (id: string) => {
        const res = await cancelBookingAction(id);
        if (res?.error) {
            toast.error(res.error.message);
        } else {
            toast.success("Booking cancelled successfully!");
        }
    };

    return (
        <Table>
            <TableHeader className={isHistory ? "bg-gray-50/50" : "bg-blue-50/30"}>
                <TableRow className="hover:bg-transparent border-b-2">
                    <TableHead className="w-[250px] font-bold text-gray-700">Tutor Details</TableHead>
                    <TableHead className="font-bold text-gray-700">Subject</TableHead>
                    <TableHead className="font-bold text-gray-700">Schedule</TableHead>
                    <TableHead className="text-center font-bold text-gray-700">Status</TableHead>
                    <TableHead className="text-right font-bold text-gray-700">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <img 
                                    src={booking.tutor.image} 
                                    alt="Tutor" 
                                    className={`h-10 w-10 rounded-xl object-cover ${isHistory ? 'grayscale-[0.5]' : 'ring-2 ring-blue-50'}`} 
                                />
                                <div>
                                    <p className="font-bold text-gray-900 leading-none">{booking.tutor.user.name}</p>
                                    <p className="text-[11px] text-gray-500 mt-1">{booking.tutor.user.email}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none font-bold py-1 px-3">
                                <BookOpen className="h-3 w-3 mr-1.5" />
                                {booking.tutor.subject}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                    <CalendarDays className="h-3.5 w-3.5 text-blue-600" />
                                    {new Date(booking.timeSlot.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                </div>
                                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                    <Clock className="h-3 w-3" />
                                    {new Date(booking.timeSlot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-center">
                            <StatusBadge status={booking.status} />
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end items-center gap-2">
                                {!isHistory && booking.status === "PENDING" && (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button className="p-2 hover:bg-red-50 rounded-full transition-colors group">
                                                <XCircle className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                                            </button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="rounded-2xl">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle></AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to cancel this booking?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="rounded-xl">Close</AlertDialogCancel>
                                                <AlertDialogAction 
                                                    onClick={() => handleCancel(booking.id)}
                                                    className="bg-red-600 hover:bg-red-700 rounded-xl"
                                                >
                                                    YES, CANCEL
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )}


                                {
                                    booking.status === "PENDING" || booking.status ==="CONFIRMED" ?
                                    null
                                    : 

                                  <ReviewModal 
        tutorId={booking.tutor.id}      // Booking table direct field
        studentId={booking.studentId}  // Booking table direct field
        tutorName={booking.tutor.user.name} 
    />
                                }

                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}