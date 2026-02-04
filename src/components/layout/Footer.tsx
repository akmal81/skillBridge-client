import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* ১. লোগো এবং ডেসক্রিপশন */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="https://i.ibb.co.com/9HsnfTCh/skillbridge-Logo.jpg"
                alt="Skillbridge Logo"
                width={120}
                height={30}
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering learners worldwide with expert-led courses and mentorship.
            </p>
          </div>

          {/* ২. কুইক লিঙ্কস */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Browse Courses</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Mentors</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* ৩. কোম্পানি */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* ৪. সোশ্যাল মিডিয়া */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Follow Us</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={20} /></Link>
            </div>
          </div>
        </div>

        {/* নিচের কপিরাইট অংশ */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Skillbridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}