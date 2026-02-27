"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSession } from "@/actions/user.actions";
import { UserData } from "@/types";
import { time } from "console";
import { createBooking } from "@/actions/booking.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  availability: boolean;
}

export default function TutorTimeSlotSelection({ timeSlots, tutorId }: { timeSlots: TimeSlot[], tutorId: string }) {


const router = useRouter();

 const [userData, setUserData] = useState<UserData | null>(null);
            const [isLoggedIn, setIsLoggedIn] = useState(false);


          useEffect(() => {
    const fetchSession = async () => {
        try {
            const res = await getSession();
            

            if (res && res.data) {
                setUserData(res.data.user);
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };
    fetchSession();
}, []);


const sutdentId = userData?.id;


const payload = {
    tutorId: tutorId,
    studentId: sutdentId,
}







const handleBookSession = async (timeSlotId: string) => {
    if (!isLoggedIn || !userData?.id) {
        toast.error("Please login to book a session", {
            description: "You need a student account to book a tutor.",
        });
        return;
    }

    const bookingData = {
        timeSlotId,
        studentId: sutdentId,
        tutorId: tutorId
    };

    try {
        console.log("Booking Payload:", payload);
        
        const response = await createBooking(bookingData);

        if (response?.error) {
            toast.error(response.error.message || "Booking failed");
        } else {
            toast.success("Session booked successfully!", {
                description: "Check your dashboard for meeting details.",
            });
           
            router.push("/dashboard/my-bookings");
        }
    } catch (error) {
        console.error("Booking Error:", error);
        toast.error("Something went wrong. Please try again.");
    }
};




  return (
    <div className="space-y-3 w-full max-w-4xl mx-auto">
        {tutorId}
      <h3 className="text-xl font-bold text-gray-800 mb-4 px-2">Available Sessions</h3>
      
      {timeSlots.map((slot) => {
        const isBooked = slot.isBooked || !slot.availability;

        return (
          <Card 
            key={slot.id} 
            className={`p-4 rounded-2xl border border-gray-100 transition-all ${
              isBooked ? "bg-gray-50 opacity-60" : "hover:shadow-md bg-white"
            }`}
          >
            <div className="flex flex-col   justify-between gap-4">
              
              {/* ১. তারিখ (Date) */}
              <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-[140px]">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 leading-none">Date</p>
                  <p className="text-sm font-bold text-gray-800">
                    {format(new Date(slot.date), "EEE, MMM dd")}
                  </p>
                </div>
              </div>

              {/* ২. সময় (Time Range) */}
              <div className="flex items-center gap-3 min-w-[200px]">
                <div className="bg-emerald-50 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 leading-none">Schedule</p>
                  <p className="text-sm font-bold text-gray-800">
                    {format(new Date(slot.startTime), "hh:mm a")} - {format(new Date(slot.endTime), "hh:mm a")}
                  </p>
                </div>
              </div>
              </div>

              {/* ৩. বুক সেশন বাটন */}
              <div className="flex items-center gap-4">
                <Button 
                  disabled={isBooked}
                //   className={`rounded-xl px-6 font-bold transition-all ${
                //     isBooked 
                //     ? "bg-gray-200 text-gray-500" 
                //     : "bg-primary hover:bg-primary/90 shadow-sm"
                //   }`}

                className="w-full rounded-full"
                  onClick={() => handleBookSession(slot.id)}
                >
                  {isBooked ? "Not Available" : "Book Session"}
                  {!isBooked && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>

            </div>
          </Card>
        );
      })}

      {timeSlots.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed">
          <p className="text-gray-400 font-medium">No slots available at the moment.</p>
        </div>
      )}
    </div>
  );
}