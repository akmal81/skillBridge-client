import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

const reviews = [
    {/* 
    


https://i.ibb.co.com/chjG5dr3/student-3-1.jpg
    
    */
        id: 1,
        name: "Samiur Rahman",
        role: "HSC Candidate",
        comment: "The Mathematics course on Skillbridge completely removed my fear of the subject. Dr. Mansoor's teaching style is truly exceptional!",
        image: "https://i.ibb.co.com/chjG5dr3/student-3-1.jpg",
        rating: 5,
    },
    {
        id: 2,
        name: "Nusrat Jahan",
        role: "University Student",
        comment: "I haven't seen a better platform for IELTS preparation. The support from mentors is highly commendable and effective.",
        image: "https://i.ibb.co.com/JFBSft8c/student-1.jpg",
        rating: 5,
    },
    {
        id: 3,
        name: "Rakib Ahmed",
        role: "Web Learner",
        comment: "The courses here are very well-organized and easy to follow. Project-based learning has helped me significantly in my career.",
        image: "https://i.ibb.co.com/PsgqtPCr/student-2.jpg",
        rating: 4,
    },
    {
        id: 4,
        name: "Ayesha Siddiqa",
        role: "SSC Student",
        comment: "The Science section videos are incredibly informative. Physics concepts now seem much simpler and clearer than before.",
        image: "https://i.ibb.co.com/pjn8BPVM/student-3.jpg",
        rating: 5,
    }
];

export default function StudentReviews() {
    return (
        <section className="py-24 bg-muted/20 overflow-hidden">
            <div className="container mx-auto px-5 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    What Our <span className="text-primary">Students Say</span>
                </h2>
                <p className="text-muted-foreground mb-16 text-lg max-w-2xl mx-auto">
                    Thousands of students are learning their favorite subjects from our platform. Let&apos;s hear about their experiences.
                </p>

                <div className="relative px-10">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full max-w-6xl mx-auto"
                    >
                        <CarouselContent>
                            {reviews.map((review) => (
                                <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-2 h-full">
                                        <Card className="h-full border-none shadow-lg rounded-[2rem] p-8 relative hover:scale-[1.02] transition-transform duration-300">
                                            <Quote className="absolute top-6 right-8 h-12 w-12 text-primary/10" />

                                            <CardContent className="p-0 flex flex-col h-full justify-between">
                                                <div>
                                                    {/* Rating Stars */}
                                                    <div className="flex gap-1 mb-6">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>

                                                    <p className="text-muted-foreground text-left leading-relaxed italic mb-8">
                                                        &apos;{review.comment}&apos;
                                                    </p>
                                                </div>

                                                {/* Student Profile Info */}
                                                <div className="flex items-center gap-4 border-t pt-6">
                                                    <Image
                                                        src={review.image}
                                                        alt={review.name}
                                                        width={50}
                                                        height={50}
                                                        className="rounded-full border-2 border-primary/20"
                                                    />
                                                    <div className="text-left">
                                                        <h4 className="font-bold text-lg">{review.name}</h4>
                                                        <p className="text-xs text-primary font-medium">{review.role}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Navigation Arrows */}
                        <div className="hidden md:block">
                            <CarouselPrevious className="-left-12 bg-white" />
                            <CarouselNext className="-right-12 bg-white" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}