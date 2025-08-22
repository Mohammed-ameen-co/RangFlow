import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IoLogoGithub } from "react-icons/io";
import { FaUsers, FaUser } from 'react-icons/fa';
import Typewriter from '../components/Typewriter';
import { Link } from "react-router-dom";
import clock from "../assets/clock.png"
import paper from "../assets/paper.png"
import rocket from "../assets/rocket.png"

export default function LandingPage() {
  const navigate = useNavigate();

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      {/* Navbar */}
      <header className="flex flex-col md:flex-row justify-between items-center p-6 lg:px-12 sticky top-0 z-50 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg border-b border-gray-800">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 md:mb-0">
          RangFlow
        </h1>
        <nav className="flex items-center space-x-4 md:space-x-6">
          <button
            className="text-gray-300 hover:text-white transition-colors duration-300 text-sm md:text-base"
            onClick={() => handleScrollToSection('about')}
          >
            About
          </button>
          <button
            className="text-gray-300 hover:text-white transition-colors duration-300 text-sm md:text-base"
            onClick={() => handleScrollToSection('features')}
          >
            Features
          </button>
          <button
            className="bg-white text-gray-900 px-4 md:px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6 py-24 md:py-48 bg-gray-900">
        
        <h2 className="text-4xl md:text-7xl font-extrabold mb-6 max-w-4xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 min-h-[100px]">
          <Typewriter words={["Simplify your workflow.", "Collaborate seamlessly.","Manage your tasks.", "RangFlow."]} />
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mb-10 text-gray-300">
          Simplify your workflow, visualize tasks, and collaborate seamlessly with RangFlow. The smarter way to get work done.
        </p>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <button
            className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => navigate("/register?mode=individual")}
          >
            <FaUser />
            <span>Work Individually</span>
          </button>
          <button
            className="flex items-center justify-center space-x-2 bg-gray-700 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => navigate("/register?mode=team")}
          >
            <FaUsers />
            <span>Work with a Team</span>
          </button>
        </div>
      </main>

      {/* About Section */}
      <section id="about" className="bg-gray-800 py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            About RangFlow
          </h3>
          <p className="text-lg md:text-xl max-w-4xl mx-auto text-gray-300">
            RangFlow is a modern, intuitive platform designed to help teams and individuals manage their projects with ease. Our goal is to make task management visual, efficient, and enjoyable.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-900 py-16 px-6 md:px-12">
        <h3 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">
          Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:bg-gray-700 transition-colors duration-300">
            <div className="text-5xl mb-4 text-purple-400"><img src={paper} alt="paper" className="w-10 invert-100"/></div>
            <h4 className="font-bold text-2xl mb-3 text-white">Visual Task Boards</h4>
            <p className="text-gray-400">Organize and prioritize your work with custom boards. Drag and drop tasks to visualize progress instantly.</p>
          </div>
          <div className="p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:bg-gray-700 transition-colors duration-300">
            <div className="text-5xl mb-4 text-pink-400"><img src={clock} alt="clock" className="w-10 invert-100"/></div>
            <h4 className="font-bold text-2xl mb-3 text-white">Deadline Tracking</h4>
            <p className="text-gray-400">Never miss a deadline. Set due dates, get reminders, and keep your projects on schedule effortlessly.</p>
          </div>
          <div className="p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:bg-gray-700 transition-colors duration-300">
            <div className="text-5xl mb-4 text-blue-400"><img src={rocket} alt="rocket" className="w-10 invert-100"/></div>
            <h4 className="font-bold text-2xl mb-3 text-white">Seamless Collaboration</h4>
            <p className="text-gray-400">Invite team members to work on boards together. Real-time updates ensure everyone stays in sync.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-12 px-6 md:px-12 border-t border-gray-700">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h4 className="text-white text-xl font-bold mb-4">RangFlow</h4>
            <p className="text-sm">
              Your ultimate tool for team productivity. Simplify your workflow, visualize tasks, and collaborate seamlessly.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleScrollToSection('about')} className="hover:text-white transition-colors duration-300">About Us</button></li>
              <li><button onClick={() => handleScrollToSection('features')} className="hover:text-white transition-colors duration-300">Features</button></li>
              <li><button className="hover:text-white transition-colors duration-300" onClick={() => navigate("/login")}>Login</button></li>
              <li><button className="hover:text-white transition-colors duration-300" onClick={() => navigate("/register?mode=individual")}>Register</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white text-xl font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors duration-300">Terms of Service</Link></li>
              <li><Link to="/contact-us" className="hover:text-white transition-colors duration-300">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h4 className="text-white text-xl font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61579245077482" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="https://github.com/Mohammed-ameen-co" className="text-gray-400 hover:text-white transition-colors duration-300">
                <IoLogoGithub size={24} />
              </a>
              <a href="https://www.instagram.com/ameenrangrej__/" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="www.linkedin.com/in/ameen-rangrej-b1519827b" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-sm">© {new Date().getFullYear()} RangFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}