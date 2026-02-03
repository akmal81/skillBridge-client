"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react"; // আইকন
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";


const NavItems = () => (
    <>
        <Link href="#" className="hover:text-primary transition-colors">Home</Link>
        <Link href="#" className="hover:text-primary transition-colors">About</Link>
        <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
    </>
);

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // উদাহরণস্বরূপ
    const user = { name: "User", image: "" };



    return (
        <nav className="border-b bg-background">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                {/* desktop menu */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="https://i.ibb.co.com/9HsnfTCh/skillbridge-Logo.jpg"
                            alt="Skillbridge Logo"
                            width={140}
                            height={35}
                            priority
                        />
                    </Link>


                    <div className="hidden md:flex items-center gap-6  mt-2 text-sm font-medium">
                        <NavItems />
                    </div>
                </div>


                <div className="flex items-center gap-4">


                    <div className="hidden sm:flex items-center gap-4">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                <span className="hidden text-sm font-medium lg:inline-block">{user.name}</span>
                                <Avatar>
                                    <AvatarImage src={user.image} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login"><Button variant="ghost">Login</Button></Link>
                                <Link href="/register"><Button >Register</Button></Link>
                            </div>
                        )}
                    </div>


                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="px-4 py-2">
                                <SheetTitle className="text-left mb-6">
                                    <Link href="/" className="flex items-center">
                                        <Image
                                            src="https://i.ibb.co.com/9HsnfTCh/skillbridge-Logo.jpg"
                                            alt="Skillbridge Logo"
                                            width={140} // লোগো সাইজ সামান্য এডজাস্ট করা হয়েছে
                                            height={35}
                                            priority
                                        />
                                    </Link>
                                </SheetTitle>
                                <div className="flex flex-col gap-4 mt-8 text-lg font-medium">
                                    <NavItems />
                                    <hr className="my-2" />

                                    {!isLoggedIn && (
                                        <div className="flex flex-col gap-2">
                                            <Link href="/login" className="w-full">
                                                <Button variant="outline" className="w-full">Login</Button>
                                            </Link>
                                            <Link href="/register" className="w-full">
                                                <Button className="w-full">Register</Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                </div>
            </div>
        </nav>
    );
}