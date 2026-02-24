"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { toast } from "sonner";


const formSchema = z.object({
  name: z.string(),
  description: z.string(),
})
export default function AddCategoryModal() {
  const [open, setOpen] = useState(false);


  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("User Creating")
      try {
        
      } catch (error) {
        
      }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-xl bg-secondary hover:bg-primary rounded-full flex gap-2 shadow-sm transition-all active:scale-95">
          <Plus className="h-4 w-4" /> Add Category
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] rounded-2xl border-2 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Add New Category</DialogTitle>
         
        </DialogHeader>

       
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">


          <form 
          id="category"
          onSubmit={(e)=>{
            e.preventDefault();
            form.handleSubmit()
          }}
          >

          </form>


          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button 
            variant="ghost" 
            onClick={() => setOpen(false)}
            className="rounded-xl font-medium"
          >
            Cancel
          </Button>
          <Button 
            type="button"
            className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 font-bold"
            onClick={() => {
              // ফাংশনালিটি পরে যুক্ত করার জন্য জায়গা রাখা হলো
              console.log("Submit clicked");
            }}
          >
            Create Category
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}