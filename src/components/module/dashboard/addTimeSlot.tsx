"use client";

import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Plus, Calendar as CalendarIcon, Clock, Loader2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createTimeSlotAction, getTutorByUserId } from "@/actions/tutor.action";

import { getSession } from "@/actions/user.actions";



interface TimeSlotFormValues {
    date: string;
    startTime: string;
    endTime: string;
}
export default function AddTimeSlotModal() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

     const [tutorId, setTutorId] = useState<string | null>(null);
        const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    
        useEffect(() => {
        const fetchTutor = async () => {
            try {
                const session = await getSession();
                if (session?.data?.user?.id) {
                    const tutor = await getTutorByUserId(session.data.user.id);
                    if (tutor?.success && tutor?.data) {
                        setTutorId(tutor.data.id);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch tutor info", error);
            }
        };
        fetchTutor();
    }, []);
        
    const form = useForm({
        defaultValues: {
            date: "",
            startTime: "",
            endTime: "",
        },
        onSubmit: async ({ value }) => {
    if (!tutorId) return toast.error("Tutor ID not found!");
    
    setLoading(true);
    try {
        const result = await createTimeSlotAction({
            date: value.date,
            startTime: value.startTime,
            endTime: value.endTime,
            tutorId: tutorId
        });

        if (result.success) {
            toast.success("Time slot created successfully!");
            setOpen(false);
            form.reset();
        } else {
            toast.error(result.error);
        }
    } catch (error) {
        toast.error("Time slot creation failed!");
    } finally {
        setLoading(false);
    }
}
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full bg-primary hover:bg-primary/90 px-6 py-6 flex gap-2 text-base font-bold shadow-lg">
                    <Plus size={20} />
                    Add New Slot
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] p-10 border-none shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">
                        Create Time Slot
                    </DialogTitle>
                    <p className="text-gray-500 text-sm">Add a new time slot to your schedule.</p>
                </DialogHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-6 pt-6"
                >
                    {/* Date Field */}
                    <form.Field
                        name="date"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name} className="font-bold text-gray-700">Date</Label>
                                <div className="relative">
                                    <CalendarIcon className="absolute left-4 top-3 h-4 w-4 text-primary" />
                                    <Input
                                        id={field.name}
                                        type="date"
                                        className="pl-12 py-6 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white transition-all"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        {/* Start Time */}
                        <form.Field
                            name="startTime"
                            children={(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name} className="font-bold text-gray-700">Start Time</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-3 h-4 w-4 text-primary" />
                                        <Input
                                            id={field.name}
                                            type="time"
                                            className="pl-12 py-6 rounded-2xl bg-gray-50 border-gray-100"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                        />

                        {/* End Time */}
                        <form.Field
                            name="endTime"
                            children={(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name} className="font-bold text-gray-700">End Time</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-3 h-4 w-4 text-primary" />
                                        <Input
                                            id={field.name}
                                            type="time"
                                            className="pl-12 py-6 rounded-2xl bg-gray-50 border-gray-100"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-7 rounded-[1.5rem] font-bold text-lg shadow-xl shadow-primary/20 transition-transform active:scale-95"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" /> : "Save Time Slot"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}