import { Mail, Instagram, Twitter } from 'lucide-react';
export const dynamic = 'force-dynamic';

export default function ContactPage() {
    return (
        <div className="bg-[#2D2D2D] p-8 rounded-2xl max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
            <form className="space-y-6">
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Nama Lengkap</label>
                    <input type="text" id="name" className="w-full bg-[#E94A61] placeholder-white/70 text-white rounded-lg p-3 focus:outline-none" placeholder="Ketik disini" />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">E-mail</label>
                    <input type="email" id="email" className="w-full bg-[#E94A61] placeholder-white/70 text-white rounded-lg p-3 focus:outline-none" placeholder="Ketik disini" />
                </div>
                <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">Message</label>
                    <textarea id="message" rows={5} className="w-full bg-[#E94A61] placeholder-white/70 text-white rounded-lg p-3 focus:outline-none" placeholder="Ketik disini"></textarea>
                </div>
            </form>
            <div className="mt-12 pt-8 border-t border-gray-600 flex justify-around items-center">
                <a href="mailto:cosplayerwardrobe@gmail.com" className="flex flex-col items-center space-y-2 hover:text-[#E94A61]">
                    <Mail size={28}/>
                    <span>cosplayerwardrobe@gmail.com</span>
                </a>
                <a href="#" className="flex flex-col items-center space-y-2 hover:text-[#E94A61]">
                    <Instagram size={28}/>
                    <span>cosplayerwardrobe_</span>
                </a>
                <a href="#" className="flex flex-col items-center space-y-2 hover:text-[#E94A61]">
                    <Twitter size={28}/>
                    <span>cosplayerwardrobe</span>
                </a>
            </div>
        </div>
    );
}