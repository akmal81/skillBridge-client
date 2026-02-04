// error page must have 
"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";


export default function AboutError({
    error, reset
}: { error: Error & { digest?: string }; reset: () => void }) {

    useEffect(() => {
        console.log(error)

    }, [])

    return (
        <div className="h-screen flex  gap-4 flex-col justify-center items-center text-center space-x-4 px-4">
            <div>
                <h1 className="
                text-2xl 
                
                " >Something Went Wrong:please try again later</h1>
                <Button variant="destructive" onClick={() => reset}
                    className="bg-primary mt-8"
                    >Retry</Button>
            </div>
        </div>
    )
}
