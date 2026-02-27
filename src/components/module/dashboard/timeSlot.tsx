"use client";
import { Plus, Clock, Calendar, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { toggleAvailabilityAction } from "@/actions/tutor.action";
import AddTimeSlotModal from "./addTimeSlot";
interface TimeSlot {
    tutorId: string;
    date: string;
    startTime: string;
    endTime: string;
    availability: boolean;
}
export default function TimeSlotPage({ timeSlots }: { timeSlots: any[] }) {

    const [isPending, setIsPending] = useState(false);

    const handleToggle = async (slotId: string, availability: boolean) => {
        setIsPending(true);
        const res = await toggleAvailabilityAction(slotId, availability);
        setIsPending(false);

        if (res.success) {
            toast.success(availability ? "Slot is now Unavailable" : "Slot is now Available");
        } else {
            toast.error(res.error);
        }
    };

// console.log(timeSlots.tutorId)
    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
            {/* Header with Add Button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Availability</h1>
                    <p className="text-gray-500 font-medium text-sm mt-1">Set your teaching hours and manage your schedule.</p>
                </div>
                {/* <Button className="rounded-full bg-primary hover:bg-primary/90 px-6 py-6 flex gap-2 text-base font-bold transition-all shadow-lg shadow-primary/20">
                    <Plus size={20} />
                    Add New Slot
                </Button> */}

                <AddTimeSlotModal/>
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {timeSlots.map((slot) => (
                    <Card
                        key={slot.id}
                        className={`border-none rounded-[2rem] shadow-sm transition-all duration-300 overflow-hidden ${slot.isBooked ? "bg-gray-50 opacity-80" : "bg-white hover:shadow-md"
                            }`}
                    >
                        <CardContent className="p-6 space-y-5">
                            {/* Date & Status Badge */}
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-1.5 rounded-xl">
                                    <Calendar size={14} className="text-primary" />
                                    <span className="text-xs font-bold">{format(new Date(slot.date), "MMM dd, yyyy")}</span>
                                </div>
                                {slot.isBooked ? (
                                    <Badge className="bg-amber-100 text-amber-700 border-none rounded-lg px-2 shadow-sm">
                                        Booked
                                    </Badge>
                                ) : !slot.availability ? (
                                    <Badge className="bg-rose-100 text-rose-700 border-none rounded-lg px-2 shadow-sm">
                                        Unavailable
                                    </Badge>
                                ) : (
                                    <Badge className="bg-emerald-100 text-emerald-700 border-none rounded-lg px-2 shadow-sm">
                                        Open
                                    </Badge>
                                )}
                            </div>

                            {/* Time Display */}
                            <div className="flex items-center gap-4 py-2">
                                <div className="bg-primary/5 p-3 rounded-2xl">
                                    <Clock size={24} className="text-primary" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-900">
                                        {format(new Date(slot.startTime), "p")} - {format(new Date(slot.endTime), "p")}
                                    </span>
                                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Session Duration</span>
                                </div>
                            </div>

                            {/* Conditional Action Buttons */}
                            <div className="pt-2 flex gap-2">
                                {slot.isBooked ? (
                                    <Button disabled className="w-full rounded-xl bg-gray-200 text-gray-500 cursor-not-allowed border-none">
                                        Slot Booked
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={(e) => { e.preventDefault(); handleToggle(slot.id, slot.availability) }}
                                        disabled={isPending || slot.isBooked}
                                        variant="outline"
                                        className={`flex-1 rounded-xl transition-colors ${slot.availability
                                            ? "border-rose-100 text-rose-600 hover:bg-rose-50"
                                            : "border-emerald-100 text-emerald-600 hover:bg-emerald-50"
                                            }`}
                                    >
                                        {isPending ? "Updating..." : slot.availability ? "Make Unavailable" : "Make Available"}
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {timeSlots.length === 0 && (
                <div className="py-24 text-center bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <Clock className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-bold text-lg">No time slots created</p>
                    <p className="text-gray-400 text-sm">Start adding slots to receive bookings from students.</p>
                </div>
            )}
        </div>
    );
}