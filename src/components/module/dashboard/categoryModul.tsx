"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";

import { FieldGroup } from "@/components/ui/field"; 
import { toast } from "sonner";
import { createCategory } from "@/actions/category.action";

const formSchema = z.object({
  catName: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

export default function AddCategoryModal() {
  const [open, setOpen] = useState(false);

  
  const form = useForm({
    defaultValues: {
      catName: "",
      description: "",
    },
  
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
     try {
       
        const result = await createCategory(value);

        if (result.success) {
          toast.success("Category created successfully!");
          form.reset();
          setOpen(false); 
        } else {
         
          toast.error(result.message || "Failed to create category");
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full bg-secondary hover:bg-primary flex gap-2 shadow-sm transition-all active:scale-95">
          <Plus className="h-4 w-4" /> Add Category
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] rounded-2xl border-2 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Add New Category</DialogTitle>
        </DialogHeader>

        <form 
          id="category-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 py-4"
        >
          <FieldGroup className="space-y-4">
            {/* Name Field */}
            <form.Field
              name="catName"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                return (
                  <div className="space-y-1">
                    <label htmlFor={field.name} className="text-sm font-semibold text-gray-700">Name</label>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. Science, Mathematics"
                      className={`rounded-xl h-11 ${isInvalid ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {isInvalid && (
                      <p className="text-xs text-red-500 font-medium">{field.state.meta.errors.join(", ")}</p>
                    )}
                  </div>
                )
              }}
            />

            {/* Description Field */}
            <form.Field
              name="description"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                return (
                  <div className="space-y-1">
                    <label htmlFor={field.name} className="text-sm font-semibold text-gray-700">Description</label>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Brief description of the category"
                      className={`rounded-xl h-11 ${isInvalid ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {isInvalid && (
                      <p className="text-xs text-red-500 font-medium">{field.state.meta.errors.join(", ")}</p>
                    )}
                  </div>
                )
              }}
            />
          </FieldGroup>

          <div className="flex justify-end gap-3 mt-6">
            <Button 
              type="button"
              variant="ghost" 
              onClick={() => setOpen(false)}
              className="rounded-xl font-medium"
            >
              Cancel
            </Button>
            
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button 
                  type="submit"
                  disabled={!canSubmit}
                  className="bg-secondary hover:bg-primary rounded-xl px-8 font-bold"
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</>
                  ) : (
                    "Create Category"
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