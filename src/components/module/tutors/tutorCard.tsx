
import { Star, GraduationCap, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tutor } from "@/types";
import Link from "next/link";
import { env } from "@/env";

const FRONTEND_URL =env.FRONTEND_URL

export default function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="group bg-white dark:bg-card border border-border/50 rounded-[2.5rem] p-4 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-primary/20">
      
      <div className="relative h-60 w-full overflow-hidden rounded-[2rem]">
        <Image
          src={tutor.image}
          alt={tutor.name||""}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
       
        {tutor.availability && (
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="size-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Available</span>
          </div>
        )}
      </div>

     
      <div className="mt-5 px-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">{tutor.subject}</span>
          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-950/30 px-2 py-0.5 rounded-md">
            <Star className="size-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-yellow-700 dark:text-yellow-500">
              {tutor.avg_rating > 0 ? tutor.avg_rating : "New"}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-foreground leading-tight group-hover:text-primary transition-colors">
          {tutor.name}
        </h3>

        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 min-h-[40px]">
          {tutor.bio}
        </p>

       
        <div className="flex items-center gap-4 mt-4 py-3 border-y border-dashed border-border/50">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="size-4 text-primary/60" />
            <span className="text-xs font-medium">{tutor.experience} Yrs Exp</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CheckCircle2 className="size-4 text-green-500" />
            <span className="text-xs font-medium">{tutor.reviews} Reviews</span>
          </div>
        </div>

       
        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Starting from</p>
            <p className="text-2xl font-black text-foreground">
              ৳{tutor.course_price}
              <span className="text-sm font-normal text-muted-foreground">/mo</span>
            </p>
          </div>
          <Link href={`${FRONTEND_URL}/tutors/${tutor.id}`}>
          <Button className="rounded-full h-12 w-12 group-hover:w-32 transition-all duration-300 bg-secondary hover:bg-primary text-primary-foreground flex items-center justify-center gap-2 group-hover:px-4 overflow-hidden">
             <span className="hidden group-hover:block whitespace-nowrap font-bold">Details</span>
             <ArrowRight className="size-5 shrink-0" />
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}