import TutorCard from "@/components/module/tutors/tutorCard";
import { tutorService } from "@/services/tutor.service";

export default async function TutorByCategoryPage(
    { params }: { params: Promise<{ id: string }> }
) {


    const { id } = await params;

    const { data } = await tutorService.getTutorByCategory(id, { revalidate: 10 })
    console.log(data)
    return (
        <section className="py-20 bg-slate-50/30 dark:bg-transparent">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="flex justify-between items-end mb-12">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                            Meet Our <span className="text-primary">Featured</span> Tutors
                        </h2>
                        <p className="text-muted-foreground mt-3 text-lg">
                            Handpicked experts with proven track records in making complex subjects easy to understand.
                        </p>
                    </div>
                    {/* <Link href="/tutors" className="hidden md:flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all">
               Explore All <ArrowRight className="size-5" />
             </Link> */}
                </div>

                {/* Tutor Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {data?.data.map((tutor: any) => (
                        <TutorCard key={tutor.id} tutor={tutor} />
                    ))}
                </div>
            </div>
        </section>
    );
}