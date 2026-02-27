"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";


import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit3 } from "lucide-react";
import { updateTutorAction } from "@/actions/tutor.action";
import { toast } from "sonner";
import { FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

export function UpdateTutorModal({ tutor }: { tutor: any }) {
    const [open, setOpen] = useState(false);

    const form = useForm({
        defaultValues: {
            bio: tutor.bio || "",
            subject: tutor.subject || "",
            experience: tutor.experience || 0,
            course_price: tutor.course_price || 0,
            image: tutor.image || "",
            categoryId: tutor.categoryId || "",
        },

        onSubmit: async ({ value }) => {
            const res = await updateTutorAction(tutor.id, value);
            if (res.success) {
                toast.success("Profile updated!");
                setOpen(false);
            } else {
                toast.error(res.error);
            }
        },
    });

    return (
       <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
        <Button size="lg" className="rounded-full bg-primary hover:bg-secondary text-white px-8 h-12 flex gap-2">
            <Edit3 size={18} /> Edit Profile
        </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[500px] rounded-[2rem] p-8">
        <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold">Update Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }} className="space-y-5">
            
            {/* Subject Field */}
            <form.Field name="subject" children={(field) => (
                <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-semibold text-gray-700 ml-1">Subject Name</Label>
                    <Input 
                        id="subject"
                        placeholder="e.g. Higher Mathematics" 
                        value={field.state.value} 
                        onChange={(e) => field.handleChange(e.target.value)} 
                        className="rounded-xl h-11 border-gray-200 focus:ring-primary" 
                    />
                </div>
            )} />

            {/* Experience and Price Grid */}
            <div className="grid grid-cols-2 gap-4">
                <form.Field name="experience" children={(field) => (
                    <div className="space-y-2">
                        <Label htmlFor="experience" className="text-sm font-semibold text-gray-700 ml-1">Experience (Years)</Label>
                        <Input 
                            id="experience"
                            type="number" 
                            placeholder="Years" 
                            value={field.state.value} 
                            onChange={(e) => field.handleChange(Number(e.target.value))} 
                            className="rounded-xl h-11 border-gray-200" 
                        />
                    </div>
                )} />
                
                <form.Field name="course_price" children={(field) => (
                    <div className="space-y-2">
                        <Label htmlFor="price" className="text-sm font-semibold text-gray-700 ml-1">Hourly Price (৳)</Label>
                        <Input 
                            id="price"
                            type="number" 
                            placeholder="Price" 
                            value={field.state.value} 
                            onChange={(e) => field.handleChange(Number(e.target.value))} 
                            className="rounded-xl h-11 border-gray-200" 
                        />
                    </div>
                )} />
            </div>

            {/* Bio Field */}
            <form.Field name="bio" children={(field) => (
                <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-semibold text-gray-700 ml-1">About Your Service</Label>
                    <Textarea 
                        id="bio"
                        placeholder="Describe your teaching style..." 
                        value={field.state.value} 
                        onChange={(e) => field.handleChange(e.target.value)} 
                        className="rounded-xl min-h-[120px] border-gray-200 focus:ring-primary resize-none" 
                    />
                </div>
            )} />

            {/* Submit Button */}
            <Button 
                type="submit" 
                className="w-full rounded-full bg-primary hover:bg-secondary h-12 text-white font-bold transition-all mt-2"
            >
                Save Changes
            </Button>
        </form>
    </DialogContent>
</Dialog>
    );
}