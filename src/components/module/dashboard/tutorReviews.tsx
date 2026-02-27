import { Star, Quote, User, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function TutorReviews({ reviews }: { reviews: any[] }) {
  
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`${
              index < rating 
                ? "fill-orange-400 text-orange-400" 
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Student <span className="text-primary">Reviews</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Discover what {reviews.length} students have experienced with your teaching.
          </p>
        </div>
        <div className="bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10 flex items-center gap-3">
          <span className="text-primary font-bold text-2xl">4.9</span>
          <div className="flex flex-col">
            {renderStars(5)}
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-1">Average Rating</span>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((item) => (
          <Card 
            key={item.id} 
            className="group relative border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2.5rem] bg-white overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <Quote size={80} className="text-primary rotate-180" />
            </div>

            <CardContent className="p-8 space-y-6">
              {/* Review Text */}
              <div className="relative">
                <p className="text-gray-600 leading-relaxed text-sm font-medium line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
                  {item.review}
                </p>
              </div>

              {/* Rating & Date */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                {renderStars(item.rating)}
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  Verified Review
                </span>
              </div>

              {/* Student Profile */}
              <div className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-[1.5rem] group-hover:bg-primary/5 transition-colors">
                <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
                  <AvatarImage src={item.student?.image} className="object-cover" />
                  <AvatarFallback className="bg-primary text-white font-bold">
                    {item.student?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 text-sm">
                    {item.student?.name}
                  </span>
                  <span className="text-[11px] text-gray-500 flex items-center gap-1">
                    <User size={10} /> ID: {item.studentId.substring(0, 6)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {reviews.length === 0 && (
        <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-bold text-xl">No Feedback Yet</p>
          <p className="text-gray-300 text-sm">Your reviews will appear here once students provide feedback.</p>
        </div>
      )}
    </div>
  );
}