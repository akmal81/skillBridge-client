import Image from "next/image";
import { Input } from "@/components/ui/input"; // ভুলবশত button হলে input লিখুন
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CheckCircle2,Search, SearchIcon} from "lucide-react";
import HeroSearch from "./search";

export default function Hero() {
    return (
        <div className=" bg-primary-foreground px-5">
            <div className="container mx-auto flex flex-col lg:flex-row py-16 md:py-24 lg:py-32 items-center gap-10">

                {/* hero text and search */}
                <div className="w-full lg:w-2/3 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <h1 className="text-4xl lg:text-7xl font-extrabold leading-tight text-primary">
                        Learn faster. <br />
                        Stay motivated. <br />
                        <span className="text-secondary">Study smarter</span>
                    </h1>

                    <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                        Build skills with our courses and mentors from the country&apos;s most famous experts.
                        Unlock your potential tomorrow, today.
                    </p>

                    {/* search and dropdown */}
                    {/* Search Bar Container */}
                <HeroSearch/>

                    
                    <Button className="w-full mt-3 md:hidden bg-secondary hover:bg-primary rounded-full">
                        <SearchIcon className=" mr-2 h-4 w-4" /> Search
                    </Button>

                    <div className="flex mt-10 items-center justify-between w-full max-w-2xl text-primary/80">
                        <div className="flex items-center gap-4">
                            <CheckCircle2 className="text-secondary"></CheckCircle2>
                            <p className=" md:text-xl">Flexible</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <CheckCircle2 className="text-secondary"></CheckCircle2>
                            <p className=" md:text-xl">Learning path</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <CheckCircle2 className="text-secondary"></CheckCircle2>
                            <p className=" md:text-xl">Community</p>
                        </div>
                       
                    </div>
                </div>

               
                <div className="w-full lg:w-1/3 relative h-[300px] md:h-[450px] lg:h-[500px]">
                    <Image
                        src="https://i.ibb.co.com/Xrrf0hQT/Hero.png"
                        alt="Skillbridge Hero"
                        fill
                        className="object-contain shadow-" 
                        priority
                    />
                </div>
            </div>
        </div>
    );
}