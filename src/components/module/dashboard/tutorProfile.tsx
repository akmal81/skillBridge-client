import { 
  User, Mail, Briefcase, BookOpen, 
  Star, DollarSign, Calendar, Edit3 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpdateTutorModal } from "./updateTutorProfileModal";

export default function TutorProfileDashboard({ tutor, user }: { tutor: any, user: any }) {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img 
              src={tutor.image || "/default-avatar.png"} 
              alt={user.name} 
              className="w-32 h-32 rounded-3xl object-cover border-4 border-blue-50"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white w-6 h-6 rounded-full"></div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900">{user.name}</h1>
            <p className="text-blue-600 font-medium flex items-center justify-center md:justify-start gap-2">
              <BookOpen size={18} /> {tutor.subject} Instructor
            </p>
            <div className="flex items-center gap-2 mt-2 text-gray-500">
              <Mail size={16} /> {user.email}
            </div>
          </div>
        </div>
        {/* <Button size="lg" className="rounded-full bg-primary hover:bg-secondary  text-white px-8 h-12 flex gap-2">
          <Edit3 size={18} /> Edit Profile
        </Button> */}
        <UpdateTutorModal tutor={tutor} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Rating", value: `${tutor.avg_rating}.0`, icon: <Star className="text-yellow-500" />, bg: "bg-yellow-50" },
          { label: "Experience", value: `${tutor.experience} Yrs`, icon: <Briefcase className="text-blue-500" />, bg: "bg-blue-50" },
          { label: "Price/hr", value: `৳${tutor.course_price}`, icon: <DollarSign className="text-green-500" />, bg: "bg-green-50" },
          { label: "Availability", value: tutor.availability ? "Active" : "Inactive", icon: <Calendar className="text-purple-500" />, bg: "bg-purple-50" },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-6 rounded-[2rem] border border-white shadow-sm`}>
            <div className="mb-2">{stat.icon}</div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <h3 className="text-xl font-bold text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {/* About Bio */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <User size={20} className="text-blue-600" /> About Me
            </h3>
            <p className="text-gray-600 leading-relaxed italic">
              "{tutor.bio}"
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Professional Overview</h3>
            
              <div className="flex justify-between p-4 bg-gray-50 rounded-2xl">
                <span className="text-gray-500">Member Since</span>
                <span className="font-semibold text-gray-800">
                  {new Date(tutor.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
      

        
        
      </div>
    </div>
  );
}