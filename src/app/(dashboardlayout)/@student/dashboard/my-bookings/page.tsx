import { userService } from "@/services/user.service";
import { bookingService } from "@/services/bookings.service";
import { Timer } from "lucide-react";
import { MyBooking } from "@/types";
import { BookingTable } from "@/components/module/dashboard/BookingTable";
// import { BookingTable } from "./booking-table"; // সঠিক পাথ দিন

export default async function MyBookingsPage() {
    const { data: session } = await userService.getSession();
    const studentId = session.user.id;
    const { data: bookings } = await bookingService.getBookingByStudentId(studentId);
console.log(bookings)
    const activeBookings = [
        ...(bookings.upcoming || []),
        ...(bookings.past || [])
    ].filter(
        (b: MyBooking) => b.status === "PENDING" || b.status === "CONFIRMED"
    );

    const historyBookings = [
        ...(bookings.past || []),
        ...(bookings.upcoming || [])
    ].filter(
        (b: MyBooking) => b.status === "COMPLETED" || b.status === "CANCELLED"
    );

    return (
        <div className="p-6 lg:p-10 space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Bookings</h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage your upcoming and past tuition sessions.</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2">
                        <Timer className="h-4 w-4" />
                        Total Active: {activeBookings.length}
                    </div>
                </div>
            </div>

            {/* Upcoming Sessions */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                    <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                    <h2 className="text-lg font-bold text-gray-800">Upcoming Sessions</h2>
                </div>
                <div className="rounded-2xl border-2 border-gray-100 bg-white shadow-sm overflow-hidden">
                    <BookingTable data={activeBookings} />
                </div>
            </section>

            {/* History Section */}
            <section className="space-y-4 pt-4">
                <div className="flex items-center gap-2 px-1">
                    <div className="h-2 w-2 rounded-full bg-gray-400" />
                    <h2 className="text-lg font-bold text-gray-700">Past & Cancelled</h2>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white/60 overflow-hidden">
                    <BookingTable data={historyBookings} isHistory={true} />
                </div>
            </section>
        </div>
    );
}