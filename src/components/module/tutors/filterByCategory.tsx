"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/types";

export default function CategoryFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  console.log(categories)



  const handleFilter = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") {
      params.delete("catId");
    } else {
      params.set("catId", id);
    }
  
    router.push(`/tutors/all-tutors?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleFilter} defaultValue={searchParams.get("catId") || "all"}>
      <SelectTrigger className="w-[200px] rounded-2xl h-12 border-2">
        <SelectValue placeholder="Select Subject" />
      </SelectTrigger>
      <SelectContent className="rounded-2xl">
        <SelectItem value="all">All Subjects</SelectItem>
        {categories.map((cat) => (
          <SelectItem key={cat.id} value={cat.id}>
            {cat.catName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}