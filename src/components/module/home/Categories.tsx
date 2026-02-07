import { Button } from "@/components/ui/button";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types";


import { 
  Calculator, 
  Atom, 
  Languages, 
  Code, 
  Music, 
  Microscope, 
  Globe, 
  LucideLanguages,
  LanguagesIcon,
  HistoryIcon,
  BookAIcon
} from "lucide-react";
import Link from "next/link";

const CATEGORY_STYLE: Record<string, { icon: any, color: string, bg: string }> = {
  "Math": { icon: Calculator, color: "text-blue-600", bg: "bg-blue-50" },
  "Science": { icon: Microscope, color: "text-emerald-600", bg: "bg-emerald-50" },
  "Physics": { icon: Atom, color: "text-purple-600", bg: "bg-purple-50" },
  "English": { icon: Languages, color: "text-orange-600", bg: "bg-orange-50" },
  "Programming": { icon: Code, color: "text-slate-800", bg: "bg-slate-100" },
  "Bangla": { icon: BookAIcon, color: "text-pink-600", bg: "bg-pink-50" },
  "default": { icon: Globe, color: "text-gray-600", bg: "bg-gray-50" }
};

export default async function CategorySection() {

const {data: categories} = await categoryService.getAllCagetories();



    return (
        <section className="py-16 container mx-auto px-5">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Explore Categories</h2>
                    <p className="text-muted-foreground mt-2">Pick a subject and find your tutor today</p>
                </div>
                <button className="text-primary font-semibold hover:underline">View All</button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories?.data?.map((category: Category) => {
                    
                    const style = CATEGORY_STYLE[category.catName] || CATEGORY_STYLE["default"];
                    const Icon = style.icon;

                    return (
                        <Link key={category.id} href={`tutors/category/${category.id}`}>
                        <div
                            key={category.id}
                            className="group p-8 rounded-[2.5rem] border bg-card hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all cursor-pointer hover:-translate-y-3"
                        >
                            <div className={`w-16 h-16 ${style.bg} ${style.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                                <Icon className="w-8 h-8" />
                            </div>
                            
                            <h3 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">
                                {category.catName}
                            </h3>
                            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                {category.tutors} Expert Tutors
                            </p>
                           
                        </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}