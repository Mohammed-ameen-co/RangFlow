import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IoLogoGithub } from "react-icons/io";
import { FaArrowLeft } from 'react-icons/fa';

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 relative">
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
      >
        <FaArrowLeft size={20} />
        <span className="hidden md:inline">Go Back</span>
      </button>

      <div className="text-center mb-12 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
          Get in Touch
        </h2>
        <p className="text-lg md:text-xl text-gray-400">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="w-full max-w-xl bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Contact Info */}
        <div className="flex flex-col space-y-8">
          <div className="flex items-center space-x-4">
            <FaEnvelope size={24} className="text-purple-400" />
            <div>
              <p className="text-gray-400">Email</p>
              <a 
                href="mailto:rangflow.contact@gmail.com" 
                className="text-lg font-semibold hover:text-white transition-colors duration-300"
              >
                rangflow.contact@gmail.com
              </a>
            </div>
          </div>
          
          {/* Social Media Links */}
          <div className="flex space-x-6 mt-4">
            <a href="https://www.facebook.com/profile.php?id=61579245077482" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
              <FaFacebook size={24} />
            </a>
            <a href="https://github.com/Mohammed-ameen-co" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
              <IoLogoGithub size={24} />
            </a>
            <a href="https://www.instagram.com/ameenrangrej__/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/ameen-rangrej-b1519827b" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Placeholder Message */}
        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-gray-400 text-center text-md md:text-lg">
            We are here to help. Feel free to reach out to us with any questions or feedback you may have.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;