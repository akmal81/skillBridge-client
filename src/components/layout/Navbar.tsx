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
        <Link href="#" className="font- text-secondary hover:text-primary    transition-colors">Home</Link>
        <Link href="#" className="font- text-secondary hover:text-primary transition-colors">About</Link>
        <Link href="#" className="font- text-secondary hover:text-primary transition-colors">Contact</Link>
    </>
);

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // উদাহরণস্বরূপ
    const user = { name: "Akmal", image: "https://i.ibb.co.com/hJQVk7sJ/profile.jpg" };



    return (
        <nav className="border-b bg-background">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                {/* desktop menu */}
                <div className="flex items-center gap-16">
                    <Link href="/" className="flex items-center">
                        {/* <Image
                            src="https://i.ibb.co.com/9HsnfTCh/skillbridge-Logo.jpg"
                            alt="Skillbridge Logo"
                            width={140}
                            height={35}
                            priority
                        /> */}

                        <h1 className="text-primary font-bold text-4xl">
                            Skill
                            <span className="text-secondary">
                                bridge
                                </span>
                                <span className="">.</span></h1>
                    </Link>


                    <div className="hidden md:flex items-center gap-6 mt-3  text-sm font-medium">
                        <NavItems />
                    </div>
                </div>


                <div className="flex items-center gap-4">


                    <div className="hidden sm:flex items-center gap-4">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                
                                <span className="hidden text-sm font-medium lg:inline-block">{user.name}</span>
                                <Avatar>
                                     <Image
                            src={user.image}
                            alt="Skillbridge Logo"
                            width={50}
                            height={50}
                            priority
                        />
                                    {/* <AvatarImage src={user.image} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback> */}
                                </Avatar>
                                {/* logout button */}
                                <Button
                                        className="
                                        rounded-full 
                                        hover:bg-primary 
                                        hover:text-primary-foreground
                                        font-normal
                                        text-sm
                                        " 
                                        variant="ghost">
                                        Logout
                                    </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login">
                                    <Button
                                        className="rounded-full hover:bg-primary hover:text-primary-foreground" variant="ghost" size="lg">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="rounded-full bg-secondary hover:bg-primary" size="lg">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>


                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button 
                                className="hover:bg-primary-foreground"
                                variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="px-4 py-2">
                                <SheetTitle className="text-left mb-6">
                                    <Link href="/" className="flex items-center">
                                        <Image
                                            src="https://i.ibb.co.com/9HsnfTCh/skillbridge-Logo.jpg"
                                            alt="Skillbridge Logo"
                                            width={140}
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
                                                <Button 
                                                size="lg"
                                                variant="outline" 
                                                className="w-full
                                                rounded-full hover:bg-primary hover:text-primary-foreground

                                                
                                                ">Login</Button>
                                            </Link>
                                            <Link href="/register" className="w-full">
                                                <Button 
                                                size="lg"
                                                className="w-full
                                                rounded-full bg-secondary hover:bg-primary

                                                ">Register</Button>
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