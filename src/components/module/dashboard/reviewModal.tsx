"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
// import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitReviewAction } from "@/actions/review.action";

const reviewSchema = z.object({
  rating: z.number().min(1, "Select at least 1 star"),
  review: z.string().min(5, "Review too short"),
});

export function ReviewModal({ tutorId, studentId, tutorName }: { tutorId: string; studentId: string; tutorName: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: { rating: 0, review: "" },
    // validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      setLoading(true);
      const res = await submitReviewAction({ ...value, tutorId, studentId });
      setLoading(false);

      if (res.error) toast.error(res.error);
      else {
          toast.success("Review Submitted!");
          setOpen(false);
          form.reset();
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="outline" className="rounded-full">Review</Button></DialogTrigger>
      <DialogContent className="rounded-3xl">
        <DialogHeader><DialogTitle>Review for {tutorName}</DialogTitle></DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }} className="space-y-6">
          <form.Field name="rating" children={(field) => (
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} className={`h-8 w-8 cursor-pointer ${s <= field.state.value ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} onClick={() => field.setValue(s)} />
              ))}
            </div>
          )} />
          <form.Field name="review" children={(field) => (
            <Textarea placeholder="How was the session?" className="rounded-xl" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
          )} />
          <Button type="submit" className="w-full rounded-xl" disabled={loading}>{loading ? "Submitting..." : "Submit"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}