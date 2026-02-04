import { BookOpen, Languages, FlaskConical, Calculator } from "lucide-react";

const categories = [
    {
        name: "English",
        icon: <Languages className="h-8 w-8 text-blue-500" />,
        courses: "120+ Courses",
        bgColor: "bg-blue-50",
    },
    {
        name: "Bangla",
        icon: <BookOpen className="h-8 w-8 text-green-500" />,
        courses: "85+ Courses",
        bgColor: "bg-green-50",
    },
    {
        name: "Science",
        icon: <FlaskConical className="h-8 w-8 text-purple-500" />,
        courses: "150+ Courses",
        bgColor: "bg-purple-50",
    },
    {
        name: "Math",
        icon: <Calculator className="h-8 w-8 text-orange-500" />,
        courses: "200+ Courses",
        bgColor: "bg-orange-50",
    },
];

export default function CategorySection() {
    return (
        <section className="py-16 container mx-auto px-5">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div>
                    <h2 className="text-3xl font-bold">Explore Categories</h2>
                    <p className="text-muted-foreground mt-2">Pick a subject and find your tutor today</p>
                </div>
                <button className="text-primary font-semibold hover:underline">View All</button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="group p-8 rounded-2xl border bg-card hover:shadow-xl transition-all cursor-pointer hover:-translate-y-2"
                    >
                        <div className={`w-16 h-16 ${category.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            {category.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.courses}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}