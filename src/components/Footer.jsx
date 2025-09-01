import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">DataVinci</h2>
          <p className="text-gray-400">
            Empowering developers with modern UI tools and interactive components.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#features" className="hover:text-yellow-400 transition">
                Features
              </a>
            </li>
            <li>
              <a href="#checkbox" className="hover:text-yellow-400 transition">
                Checkbox
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-yellow-400 transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contact</h3>
          <p>Email: support@datavinci.com</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-yellow-400">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-yellow-400">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-yellow-400">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500">
        © {new Date().getFullYear()} DataVinci. All rights reserved.
      </div>
    </footer>
  );
}