import { tutorService } from "@/services/tutor.service";
import { categoryService } from "@/services/category.service";
import CategoryFilter from "@/components/module/tutors/filterByCategory";
import TutorCard from "@/components/module/tutors/tutorCard";
import { Tutor } from "@/types";

export default async function AllTutorsPage({
  searchParams,
}: {
  searchParams: Promise<{ catId?: string }>;
}) {
  
  const { catId } = await searchParams;

  
  const [tutorRes, categoryRes] = await Promise.all([
    tutorService.getTutorsByCategory(catId),
    categoryService.getAllCagetories(),
  ]);

  
  const tutorsArray = tutorRes?.data?.data || [];
  const categoriesArray = categoryRes?.data?.data || [];

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black italic">Find Your Tutor</h1>
            <p className="text-muted-foreground">Browse through our expert mentors</p>
          </div>

          {/* ৪. ক্যাটাগরি ড্রপডাউন */}
          <CategoryFilter categories={categoriesArray} />
        </div>

        {/* ৫. টিউটর গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tutorsArray.length > 0 ? (
            tutorsArray.map((tutor: Tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 border-2 border-dashed rounded-[3rem] bg-white dark:bg-card">
              <h2 className="text-2xl font-bold">No Tutors Found</h2>
              <p className="text-muted-foreground mt-2">
                Try changing the subject from the dropdown.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}