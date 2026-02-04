"use client"
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <section className="container mx-auto px-5 py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-primary px-8 py-16 md:px-16 md:py-20 shadow-2xl">
        
        {/* Background Decorative Elements (ঐচ্ছিক: ডিজাইনকে সুন্দর করার জন্য) */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to start your journey?
          </h2>
          <p className="text-blue-100 text-lg md:text-xl mb-10 leading-relaxed">
            Subscribe to our newsletter and get the latest course updates, 
            exclusive discounts, and learning tips straight to your inbox.
          </p>

          {/* Subscription Form */}
          <form 
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center gap-4 bg-white/10 p-2 rounded-2xl sm:rounded-full backdrop-blur-md border border-white/20"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="w-full bg-transparent px-6 py-4 text-white placeholder:text-blue-100 outline-none border-none text-lg"
            />
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-white text-primary hover:bg-blue-50 font-bold px-8 py-7 rounded-xl sm:rounded-full transition-all active:scale-95 flex gap-2"
            >
              Subscribe Now
              <Send className="h-5 w-5" />
            </Button>
          </form>
          
          <p className="mt-6 text-sm text-blue-200">
            We care about your data. Read our <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </section>
  );
}