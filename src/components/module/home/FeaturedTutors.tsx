import Image from "next/image";
import { CheckCircle2, Star, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredTutors = [
    {
        id: 1,
        name: "Dr. Sayed Mansoor",
        role: "Senior Math Instructor",
        description: "With over 10 years of experience in competitive exams, Dr. Mansoor has helped 5000+ students crack Top Engineering University admissions.",
        image: "https://i.ibb.co.com/MyXxTYVB/tutor-4.jpg",
        rating: "5.0",
        students: "12k+",
        expertise: ["Calculus", "Linear Algebra", "Physics"]
    },
    {
        id: 2,
        name: "Anika Rahman",
        role: "IELTS & TOEFL Expert",
        description: "Anika is a certified language coach specializing in helping non-native speakers achieve Band 8.0+ in IELTS within short preparations.",
        image: "https://i.ibb.co.com/j9vwMJcW/tutor-2.jpg",
        rating: "4.9",
        students: "8k+",
        expertise: ["Speaking", "Academic Writing", "Grammar"]
    }
];

export default function FeaturedTutors() {
    return (
        <section className="py-24 ">
            <div className="container mx-auto px-5">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                    <div className="max-w-2xl text-center md:text-left">
                        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                            Meet Our <span className="text-primary">Featured Tutors</span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Learn from industry leaders and academic experts who are passionate about teaching.
                        </p>
                    </div>
                    <Button variant="outline" className="
            hover:bg-primary hover:text-primary-foreground
            rounded-full px-8 h-12">View All</Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {featuredTutors.map((tutor) => (
                        <div
                            key={tutor.id}
                            className="group relative bg-white dark:bg-card p-8 rounded-[2.5rem] border hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col md:flex-row gap-8 items-center"
                        >
                            {/* Image Section */}
                            <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0">
                                <div className="absolute inset-0 bg-primary rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                                <Image
                                    src={tutor.image}
                                    alt={tutor.name}
                                    fill
                                    className="relative object-cover rounded-3xl border-4 border-white dark:border-gray-800"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider italic">
                                        Featured
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold flex items-center gap-2">
                                    {tutor.name} <CheckCircle2 className="h-5 w-5 text-blue-500 fill-blue-500/10" />
                                </h3>
                                <p className="text-primary font-medium text-sm mb-4">{tutor.role}</p>
                                <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                                    {tutor.description}
                                </p>

                                {/* Expertise Chips */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {tutor.expertise.map((skill) => (
                                        <span key={skill} className="text-[10px] bg-muted px-2 py-1 rounded-md font-semibold text-muted-foreground">
                                            #{skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between border-t pt-6">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted-foreground">Students</span>
                                            <span className="font-bold flex items-center gap-1"><GraduationCap size={14} /> {tutor.students}</span>
                                        </div>
                                        <div className="flex flex-col border-l pl-4">
                                            <span className="text-xs text-muted-foreground">Rating</span>
                                            <span className="font-bold flex items-center gap-1 text-yellow-500"><Star size={14} fill="currentColor" /> {tutor.rating}</span>
                                        </div>
                                    </div>
                                    <Button className="rounded-full">Book a Class</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}