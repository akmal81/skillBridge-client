import { bookingService } from "@/services/bookings.service";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarDays, 
  Clock, 
  User, 
  BookOpen, 
  BadgeCheck 
} from "lucide-react";
import { Booking } from "@/types";
export default async function BookingsPage() {  

    const {data: bookings} = await bookingService.getBookings();


    
    return (
    <div className="p-6 lg:p-10 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Booking Management</h1>
         
        </div>
        <div className="bg-white border-2 border-gray-100 px-6 py-3 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500 font-semibold uppercase">Total Bookings</p>
          <p className="text-2xl font-bold text-blue-600">{bookings.length}</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-2xl border-2 border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b-2 border-gray-100">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Student & Tutor</th>
                <th className="p-4 font-semibold text-gray-600">Subject</th>
                <th className="p-4 font-semibold text-gray-600">Schedule</th>
                <th className="p-4 font-semibold text-gray-600">Amount</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking:Booking) => (
                <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                  {/* Student & Tutor Info */}
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-semibold text-gray-700">Student ID:</span>
                        <span className="text-gray-500 truncate w-24">{booking.studentId}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img 
                          src={booking.tutor.image} 
                          alt="Tutor" 
                          className="h-8 w-8 rounded-full object-cover border border-gray-200"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Tutor</span>
                          <span className="text-sm font-medium text-gray-900 leading-none">
                           
                            Tutor ID: {booking.tutorId.slice(0, 8)}...
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Subject Info */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-gray-700">{booking.tutor.subject}</span>
                    </div>
                  </td>

                  {/* Schedule Info */}
                  <td className="p-4">
                    <div className="flex flex-col gap-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2 font-medium">
                        <CalendarDays className="h-4 w-4 text-gray-400" />
                        {new Date(booking.timeSlot.date).toLocaleDateString('en-GB')}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {new Date(booking.timeSlot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                        {new Date(booking.timeSlot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </td>

                  {/* Price Info */}
                  <td className="p-4">
                    <span className="font-bold text-gray-900">
                      ৳{booking.tutor.course_price}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="p-4 text-center">
                    <Badge className={
                      booking.status === "COMPLETED" 
                        ? "bg-green-100 text-green-700 border-green-200" 
                        : "bg-orange-100 text-orange-700 border-orange-200"
                    } variant="outline">
                      {booking.status}
                    </Badge>
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