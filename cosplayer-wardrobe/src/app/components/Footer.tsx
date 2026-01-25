import Link from 'next/link';
import { Mail, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2D2D2D] text-white mt-16">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1: Brand Info */}
          <div>
            <h3 className="text-xl font-bold mb-2">COSPLAYER WARDROBE</h3>
            <p className="text-gray-400">Your one-stop solution for cosplay needs.</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
               <a href="mailto:cosplayerwardrobe@gmail.com" className="text-gray-300 hover:text-[#E94A61]"><Mail size={24}/></a>
               <a href="#" className="text-gray-300 hover:text-[#E94A61]"><Instagram size={24}/></a>
               <a href="#" className="text-gray-300 hover:text-[#E94A61]"><Twitter size={24}/></a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#E94A61] transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 can be used for a newsletter or other info in the future */}
          <div>
            {/* Placeholder for future content */}
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {currentYear} Cosplayer Wardrobe. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;