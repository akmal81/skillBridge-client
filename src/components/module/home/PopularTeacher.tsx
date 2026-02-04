import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, CheckCircle } from "lucide-react";

const tutors = [

   



    {
        id: 1,
        name: "Dr. Ariful Islam",
        subject: "Math Specialist",
        rating: 4.9,
        reviews: 120,
        image: "https://i.ibb.co.com/sdHs6L94/tutor-1.jpg",
        isVerified: true,
    },
    {
        id: 2,
        name: "Sarah Tabassum",
        subject: "English Literature",
        rating: 4.8,
        reviews: 95,
        image: "https://i.ibb.co.com/qF3MvDn9/tutor-3.jpg",
        isVerified: true,
    },
    {
        id: 3,
        name: "Zunaid Ahmed",
        subject: "Physics Mentor",
        rating: 5.0,
        reviews: 210,
        image: "https://i.ibb.co.com/j9vwMJcW/tutor-2.jpg",
        isVerified: true,
    },
    {
        id: 4,
        name: "Mousumi Akter",
        subject: "Chemistry Expert",
        rating: 4.7,
        reviews: 80,
        image: "https://i.ibb.co.com/MyXxTYVB/tutor-4.jpg",
        isVerified: false,
    },
    {
        id: 5,
        name: "Tanvir Hossain",
        subject: "IELTS Instructor",
        rating: 4.9,
        reviews: 150,
        image: "https://i.ibb.co.com/sdHs6L94/tutor-1.jpg",
        isVerified: true,
    },
];

export default function TutorSlider() {
    return (
        <section className="py-20 container mx-auto px-5">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Our Popular Tutors</h2>
                <p className="text-muted-foreground mt-3 text-lg">
                    Learn from the best mentors in the country
                </p>
            </div>

            <div className="relative px-12">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {tutors.map((tutor) => (
                            <CarouselItem key={tutor.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <div className="p-2">
                                    <Card className="border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-2 duration-300 rounded-3xl overflow-hidden">
                                        <CardContent className="p-0">
                                            {/* Image Holder */}
                                            <div className="relative rounded-t-3xl h-64 w-full bg-muted">
                                                <Image
                                                    src={tutor.image}
                                                    alt={tutor.name}
                                                    fill
                                                    className="object-cover rounded-t-3xl"
                                                />
                                            </div>

                                            {/* Tutor Info */}
                                            <div className="p-6 text-center">
                                                <div className="flex items-center justify-center gap-1 mb-1">
                                                    <h3 className="font-bold text-xl">{tutor.name}</h3>
                                                    {tutor.isVerified && (
                                                        <CheckCircle className="h-4 w-4 text-blue-500 fill-blue-500/10" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-primary font-medium mb-3">
                                                    {tutor.subject}
                                                </p>

                                                <div className="flex items-center justify-center gap-2 bg-muted/30 py-2 rounded-full">
                                                    <div className="flex items-center text-yellow-500">
                                                        <Star className="h-4 w-4 fill-yellow-500" />
                                                        <span className="ml-1 text-sm font-bold text-foreground">
                                                            {tutor.rating}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground border-l pl-2">
                                                        ({tutor.reviews} reviews)
                                                    </span>
                                                </div>

                                                <button className="mt-5 w-full py-2.5 rounded-full border border-secondary hover:border-none text-primary hover:bg-primary hover:text-white transition-colors font-semibold">
                                                    View Profile
                                                </button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Slider Controls */}
                    <CarouselPrevious className="-left-4 md:-left-12 h-12 w-12 bg-primary-foreground hover:bg-primary hover:text-white shadow-lg " />
                    <CarouselNext className="-right-4 md:-right-12 h-12 w-12 bg-primary-foreground hover:bg-primary hover:text-white shadow-lg " />
                </Carousel>
            </div>
        </section>
    );
}