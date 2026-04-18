import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Top Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2  lg:grid-cols-4 justify-between gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              LMS Platform
            </h2>
            <p className="text-sm text-muted-foreground">
              Learn anytime, anywhere. Build skills with
              industry-ready courses and expert instructors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#">Home</a></li>
              <li><a href="#">Courses</a></li>
              <li><a href="#">My Learning</a></li>
              <li><a href="#">Profile</a></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-semibold mb-3">Popular Courses</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Java Full Stack</li>
              <li>React & Next.js</li>
              <li>Data Structures</li>
              <li>Backend Development</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Help Center</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Contact Us</li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <Facebook className="w-5 h-5 cursor-pointer" />
              <Twitter className="w-5 h-5 cursor-pointer" />
              <Instagram className="w-5 h-5 cursor-pointer" />
              <Linkedin className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LMS Platform. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
