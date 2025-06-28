import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone } from "lucide-react";
const Footer = () => {
  const openWhatsApp = () => {
    window.open("https://wa.me/1234567890?text=Hi! I need help with TY projects", "_blank");
  };
  return <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TY</span>
              </div>
              <span className="font-bold text-xl">Project Provider</span>
            </div>
            <p className="text-gray-400 mb-4">
              We provide comprehensive support for your final year projects. From web applications to IoT hardware projects, we've got you covered.
            </p>
            <Button onClick={openWhatsApp} className="bg-green-600 hover:bg-green-700">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Support
            </Button>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/projects" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="/past-work" className="hover:text-white transition-colors">Past Work</a></li>
              <li><a href="/idea-generator" className="hover:text-white transition-colors">Idea Generator</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>pravinpatil90939@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>7506750982</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TY Project Provider. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;