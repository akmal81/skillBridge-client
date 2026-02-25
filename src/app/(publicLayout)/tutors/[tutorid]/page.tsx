


import TutorCard from "@/components/module/tutors/tutorCard";
import { Button } from "@/components/ui/button";
import { reviewsService } from "@/services/reviews.service";
import { tutorService } from "@/services/tutor.service";
import { Calendar, CheckCircle2, Clock, GraduationCap, MapPin, MessageCircle, ShieldCheck, Star, User } from "lucide-react";
import Image from "next/image";

export default async function TutorById(
    { params }: { params: Promise<{ tutorid: string }> }
) {
    const { tutorid } = await params;

    const { data: tutor } = await tutorService.getTutorById(tutorid, { revalidate: 10 })

    const { data: reviews } = await reviewsService.getReviewsByTutorId(tutorid)
    console.log(reviews)

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-background pb-20">

            <div className="h-64 bg-secondary/30 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
            </div>

            <div className="container mx-auto px-6 -mt-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">


                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-card border rounded-[3rem] p-8 md:p-12 shadow-sm">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="relative size-40 md:size-48 shrink-0">
                                    <Image
                                        src={tutor.image}
                                        alt={tutor.name}
                                        fill
                                        className="object-cover rounded-[2.5rem] border-4 border-white shadow-lg"
                                    />
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                            {tutor.subject}
                                        </span>
                                        {tutor.availability && (
                                            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                <span className="size-2 bg-green-500 rounded-full animate-pulse" /> Available
                                            </span>
                                        )}
                                    </div>

                                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">{tutor.name}</h1>

                                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Star className="size-5 fill-yellow-400 text-yellow-400" />
                                            <span className="font-bold text-foreground">{tutor.avg_rating}</span>
                                            <span className="text-sm">({tutor.totalReviews} Reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="size-5 text-primary" />
                                            <span className="text-sm font-medium">{tutor.experience} Years Exp.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 space-y-6">
                                <h2 className="text-2xl font-bold flex items-center gap-3">
                                    <ShieldCheck className="text-primary" /> About Me
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6">
                                    {tutor.bio}
                                </p>
                            </div>

                            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed">
                                    <GraduationCap className="size-8 text-primary mb-4" />
                                    <h4 className="font-bold">Education</h4>
                                    <p className="text-sm text-muted-foreground">Expert in Higher Mathematics & Calculus</p>
                                </div>
                                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed">
                                    <MapPin className="size-8 text-primary mb-4" />
                                    <h4 className="font-bold">Teaching Mode</h4>
                                    <p className="text-sm text-muted-foreground">Online & Offline (Home Tutoring)</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white dark:bg-card border rounded-[3rem] p-8 shadow-xl shadow-primary/5">
                            <div className="mb-8">
                                <p className="text-muted-foreground font-medium mb-1">Monthly Subscription</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-primary">৳{tutor.course_price}</span>
                                    <span className="text-muted-foreground">/per Hours</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between text-sm py-2 border-b border-dashed">
                                    <span className="text-muted-foreground flex items-center gap-2"><Calendar className="size-4" /> Days</span>
                                    <span className="font-bold text-foreground">3 Days / Week</span>
                                </div>
                                <div className="flex items-center justify-between text-sm py-2 border-b border-dashed">
                                    <span className="text-muted-foreground flex items-center gap-2"><CheckCircle2 className="size-4" /> Duration</span>
                                    <span className="font-bold text-foreground">1.5 Hours / Session</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Button className="w-full h-14 rounded-full text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                                    Book a Session
                                </Button>
                                <Button variant="outline" className="w-full h-14 text-lg rounded-full font-bold border-2 gap-2">
                                    <MessageCircle className="size-5" /> Leave a Message
                                </Button>
                            </div>

                            <p className="text-[10px] text-center text-muted-foreground mt-6 uppercase tracking-tighter">
                                Secure payment & 100% satisfaction guarantee
                            </p>
                        </div>
                    </div>

                </div>
                <div className="mt-12">
  <div className="flex items-center justify-between mb-8">
    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
      Student Feedbacks 
      <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg">
        {reviews.length}
      </span>
    </h3>
  </div>

  {reviews.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reviews.map((review: any) => (
      

<div 
    key={review.id} 
    className="mb-6 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
       
        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <User size={20} />
        </div>
        <div>
         
          <h4 className="font-bold text-gray-800">
            {review.student?.user?.name || "Verified Student"}
          </h4>
          <div className="flex items-center gap-1 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
              />
            ))}
          </div>
        </div>
      </div>
      
     
      <span className="text-sm font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
        {review.rating}.0
      </span>
    </div>

    
    <p className="text-gray-600 leading-relaxed italic">
      "{review.review}"
    </p>
  </div>

        
      ))}
    </div>
  ) : (
    <div className="text-center py-10 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
      <p className="text-gray-400">No reviews yet. Be the first to review!</p>
    </div>
  )}
</div>
            </div>
        </div>
    );
}
