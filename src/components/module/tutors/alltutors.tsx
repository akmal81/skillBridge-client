import { Star, GraduationCap, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tutor } from "@/types";
import TutorCard from "./tutorCard";

export default function TutorsPage({ tutors }: { tutors: Tutor[] }) {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-background py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* রেজাল্ট ইনফো */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Found Expert Tutors
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">
              Explore professional tutors for your skill development.
            </p>
          </div>
          <div className="bg-white dark:bg-card px-4 py-2 rounded-2xl border text-sm font-medium shadow-sm">
             Showing {tutors?.length || 0} Results
          </div>
        </div>

        {/* গ্রিড ডিসপ্লে */}
        {tutors && tutors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tutors.map((tutor: any) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white dark:bg-card rounded-[40px] border border-dashed border-primary/30">
            <div className="inline-flex items-center justify-center p-6 bg-primary/5 rounded-full mb-4">
               <GraduationCap className="size-12 text-primary/40" />
            </div>
            <h2 className="text-2xl font-bold">No Tutors Found!</h2>
            <p className="text-muted-foreground max-w-sm mx-auto mt-2">
              We couldn't find any tutors matching your search criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}