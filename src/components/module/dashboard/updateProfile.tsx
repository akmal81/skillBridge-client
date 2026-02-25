"use client";

import { useState } from "react";
import { Edit2, Loader2, User, Mail, Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
// import { zodValidator } from "@tanstack/zod-form-adapter";
import * as z from "zod";
import { toast } from "sonner";
import { updateProfileAction } from "@/actions/student.action";

// Validation Schema
const profileSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  image: z.string().url("Invalid image URL").or(z.literal("")),
});

interface EditProfileProps {
  student: {
    id: string;
    name: string;
    image?: string | null;
  };
}

export default function EditProfileModal({ student }: EditProfileProps) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: student.name,
      image: student.image || "",
    },
    
    validators: {
      onChange: profileSchema,
    },
    onSubmit: async ({ value }) => {
     try {
        // studentId টি আপনি প্রপস হিসেবে মডালে পাস করতে পারেন
        const result = await updateProfileAction(student.id, value);

        if (result.success) {
            toast.success(result.message);
            setOpen(false);
        } else {
            toast.error(result.message);
        }
    } catch (error) {
      console.log(error)
        toast.error("An unexpected error occurred");
    }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl flex gap-2 border-2 hover:bg-blue-50 hover:text-blue-600 transition-all">
          <Edit2 className="h-4 w-4" /> Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] rounded-3xl border-2">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Edit Profile</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6 pt-4"
        >
          <div className="space-y-4">
            {/* Name Field */}
            <form.Field
              name="name"
              children={(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex gap-2 items-center">
                    <User className="h-4 w-4 text-blue-600" /> Full Name
                  </label>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="rounded-xl h-12 border-2 focus-visible:ring-blue-600"
                  />
                  {field.state.meta.errors && (
                    <p className="text-xs text-red-500 font-medium">{field.state.meta.errors.join(", ")}</p>
                  )}
                </div>
              )}
            />

            {/* Profile Image URL Field */}
            <form.Field
              name="image"
              children={(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex gap-2 items-center">
                    <ImageIcon className="h-4 w-4 text-blue-600" /> Profile Image URL
                  </label>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="rounded-xl h-12 border-2 focus-visible:ring-blue-600"
                  />
                </div>
              )}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="rounded-xl font-bold"
            >
              Cancel
            </Button>
            
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 font-bold min-w-[140px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              )}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}