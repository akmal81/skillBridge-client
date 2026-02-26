"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { getSession } from "@/actions/user.actions";
import { UserData } from "@/types";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


const NavItems = () => (
    <>
        <Link href="/" className="font- text-secondary hover:text-primary    transition-colors">Home</Link>
        <Link href="/tutors/all-tutors" className="font- text-secondary hover:text-primary transition-colors">Tutors</Link>
        <Link href="/dashboard" className="font- text-secondary hover:text-primary transition-colors">Dashboard</Link>
    </>
);

export default function DashboardNavbar() {
    const router = useRouter()
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
const [mounted, setMounted] = useState(false);

  
  useEffect(() => {
    setMounted(true);
  }, []);

    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await getSession();
                    setUserData(data.user)
                    setIsLoggedIn(true)

                } catch (error) {

                }
            }
        )()

    }, [])

// console.log(userData)
    const handleSignOut = async () => {
        try {
            await authClient.signOut();
            router.replace('/login')

        } catch (err) {
            console.error("Sign out error:", err);
        }
    };


    return (
        <nav className="border-b ">
            <div className="container mx-auto flex h-16 items-center justify-between  px-4">

            

                <div className="flex items-end gap-4">
                    <div className="hidden sm:flex items-center gap-4">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-3">

                                <span className="hidden text-sm font-medium lg:inline-block">{userData?.name}</span>
                                {userData &&
                                    <Avatar>
                                        <Image
                                            src={userData?.image || "https://i.ibb.co.com/Z6NpfStC/avatar.jpg"}
                                            alt="Skillbridge Logo"
                                            width={50}
                                            height={50}
                                            priority
                                        />

                                    </Avatar>}
                                {/* logout button */}
                                <Button
                                    onClick={handleSignOut}
                                    className="
                                        rounded-full 
                                        hover:bg-primary 
                                        hover:text-primary-foreground
                                        font-normal
                                        text-sm
                                        cursor-pointer
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
                       {mounted ? (


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
                                {isLoggedIn &&
                                    <div className="flex items-center gap-3">

                                        {userData &&
                                            <Avatar>
                                                <Image
                                                    src={userData?.image || "https://i.ibb.co.com/Z6NpfStC/avatar.jpg"}
                                                    alt="Skillbridge Logo"
                                                    width={50}
                                                    height={50}
                                                    priority
                                                />

                                            </Avatar>}

                                    </div>
                                }
                                <div className="flex flex-col gap-4 mt-8 text-lg font-medium">
                                    <NavItems />
                                    <hr className="my-2" />

                                    {
                                        isLoggedIn ? <>
                                            <Button
                                            
                                                onClick={handleSignOut}
                                                size="lg"
                                                variant="outline"
                                                className="w-full cursor-pointer
                                                rounded-full hover:bg-primary hover:text-primary-foreground

                                                ">Logout</Button>
                                        </>
                                            :
                                            <>
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

                                            </>
                                    }
                                </div>
                            </SheetContent>
                        </Sheet>




                        ):(
         
            <Button variant="ghost" size="icon" disabled>
              <MenuIcon />
            </Button>
          )
                       }
                    </div>

                </div>
            </div>
        </nav>
    );
}