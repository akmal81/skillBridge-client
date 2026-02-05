
"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function HeroSearch() {

    const router = useRouter()
    const [searchType, setSearchType] = useState("subject");
    const [searchValue, setSearchValue] = useState("");
  


    const handleSearch = async () => {
        if(!searchValue.trim()) return; //if empty no params

        const params = new URLSearchParams();

        params.append(searchType.toString(), searchValue.toString())
        router.push(`/tutors?${params.toString()}`)

        console.log("button clieck")
    }
     




    return (
        <div className="mt-10 w-full max-w-2xl bg-white dark:bg-card p-2 pl-4 rounded-full shadow-lg border flex items-center justify-between gap-2">

            {/* Left Side: Select + Input Group */}
            <div className="flex items-center gap-2 flex-1">
                {/* Subject Dropdown */}
                <Select
                onValueChange={(value)=>setSearchType(value)} 
                defaultValue={searchType}
                >
                    <SelectTrigger className="w-fit h-12 border-none  focus:ring-0 rounded-full gap-2">
                        <SelectValue placeholder="Search by" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectItem className="hover:text-primary-foreground" value="subject">Subject</SelectItem>
                        <SelectItem className="hover:text-primary-foreground"  value="price">Price</SelectItem>
                        <SelectItem className="hover:text-primary-foreground" value="rating">Rating</SelectItem>
                    </SelectContent>
                </Select>

                {/* Vertical Divider */}
                <div className="h-6 w-[1px] bg-border hidden md:block" />

                {/* Search Input Field */}
                <div className="relative flex-1">
                    {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /> */}
                    <Input
                        type="text"
                        placeholder={`Search by ${searchType}`}
                        value={searchValue}
                        onChange={(e)=>setSearchValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="w-full pl-12 pr-4 py-2 border-none shadow-none outline-none text-sm bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"

                    />
                </div>
            </div>

            {/* Right Side: Search Button */}
            <Button
            onClick={handleSearch}
                size="icon"
                className=" rounded-full hidden md:flex bg-secondary  hover:bg-primary h-16 w-16 shrink-0"
            >
                <SearchIcon className="h-12 w-12" />
            </Button>

        </div>

    )
}