import Footer from "@/components/layout/Footer";
import CategorySection from "@/components/module/home/Categories";
import FeaturedTutors from "@/components/module/home/FeaturedTutors";
import Hero from "@/components/module/home/Hero";
import Newsletter from "@/components/module/home/NewsLetter";
import TutorSlider from "@/components/module/home/PopularTeacher";
import StudentReviews from "@/components/module/home/StudentReviews";

export default function Home() {
  return (
    <section className="">
     <Hero/>
     <FeaturedTutors/>
     <CategorySection/>
     <TutorSlider/>
     <StudentReviews/>
     <Newsletter/>
     <Footer/>
    </section>
  );
}

