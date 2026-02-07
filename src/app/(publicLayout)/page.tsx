
import CategorySection from "@/components/module/home/Categories";
import FeaturedTutors from "@/components/module/home/FeaturedTutors";
import Hero from "@/components/module/home/Hero";
import Newsletter from "@/components/module/home/NewsLetter";
import TutorSlider from "@/components/module/home/PopularTeacher";
import StudentReviews from "@/components/module/home/StudentReviews";

import { tutorService } from "@/services/tutor.service";


export default async function Home() {
  
  const {data} = await tutorService.getTutors()

  return (
    <section className="">
     <Hero/>
     <FeaturedTutors/>
     <CategorySection/>
     <TutorSlider tutors={data.data} />
     <StudentReviews/>
     <Newsletter/>
     
    </section>
  );
}

