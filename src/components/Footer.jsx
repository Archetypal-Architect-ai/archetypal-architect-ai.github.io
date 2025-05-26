import React from 'react';
import { Mail, MessageCircle, FileText, Users } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">The Verse</h3>
            <p className="text-gray-300 leading-relaxed">
              A multidimensional creative ecosystem exploring the intersection of art, technology, wisdom, and transformation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Users size={20} />
              </a>
            </div>
          </div>

          {/* Explore Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Explore</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">All Personas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Books & Philosophy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Music & Art</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Video Content</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Merchandise</a></li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Booking</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Collaborations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Manifesto</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Creative Commons</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 The Verse. Content licensed under Creative Commons.
          </div>
          <div className="text-gray-500 text-sm">
            AI-powered development by Biela.dev, powered by TeachMeCode® Institute
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
