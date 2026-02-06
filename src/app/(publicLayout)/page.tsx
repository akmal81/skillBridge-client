import Footer from "@/components/layout/Footer";
import CategorySection from "@/components/module/home/Categories";
import FeaturedTutors from "@/components/module/home/FeaturedTutors";
import Hero from "@/components/module/home/Hero";
import Newsletter from "@/components/module/home/NewsLetter";
import TutorSlider from "@/components/module/home/PopularTeacher";
import StudentReviews from "@/components/module/home/StudentReviews";
import { categoryService } from "@/services/category.service";
import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";

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
     <Footer/>
    </section>
  );
}

