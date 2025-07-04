import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ExternalLink, Menu, X } from 'lucide-react';
import React, { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100 overflow-hidden">
      {/* Navigation bar */}
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          {/* <img src="../public/assestes/img/logo.png" alt="Tevchmiyaai Logo" className="w-9 h-9 text-deepseek-blue" /> */}
{/* <img
  src="../public/assets/img/logo1.jpg" 
  alt="TinyAI Logo"
  className="w-10 h-10 object-contain" 
/> */}




          <span className="ml-2 text-deepseek-blue text-2xl font-semibold">TinyAI</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative inline-block text-left">
            {/* <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex justify-center w-full text-gray-700 hover:text-deepseek-blue transition-colors gap-1 items-center"
            >
              Explore 
            </button>
            {isOpen && (
              <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <a
                    href="https://techmiyalms.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-deepseek-blue transition-colors"
                  >
                    techmiya lms
                  </a>
                  <a
                    href="https://lms-job.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-deepseek-blue transition-colors"
                  >
                    techmiya Jobs
                  </a>
                  <a
                    href="https://techmiyaedtech.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-deepseek-blue transition-colors"
                  >
                    techmiya Ed-tech
                  </a>
                  <a
                    href="https://techmiyaprojects.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-deepseek-blue transition-colors"
                  >
                    techmiya Projects
                  </a>
                </div>
              </div>
            )} */}
          </div>

          <a 
            href="/about"
           
            className="text-gray-700 flex items-center gap-1 hover:text-deepseek-blue transition-colors"
          >
            About Us
          </a>
          <a 
            href="/contact"
           
            className="text-gray-700 flex items-center gap-1 hover:text-deepseek-blue transition-colors"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-deepseek-blue"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Navigation Menu - Slide from Right */}
      <div 
        className={`md:hidden fixed top-0 right-0 bottom-0 w-3/4 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <span className="text-lg font-semibold text-deepseek-blue">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col gap-2 p-4 pt-6">
          <div className="w-full">
            {/* <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-lg text-gray-700 hover:text-deepseek-blue transition-colors w-full text-left py-3 border-b border-gray-100 flex justify-between items-center"
            >
              Explore
              <span className="text-sm">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="w-full bg-gray-50 rounded-md my-2">
                <div className="py-2 flex flex-col">
                  <a
                    href="https://techmiyalms.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-gray-700 hover:text-deepseek-blue transition-colors"
                  >
                    techmiya lms
                  </a>
                  <a
                    href="https://lms-job.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-gray-700 hover:text-deepseek-blue transition-colors"
                  >
                    techmiya Jobs
                  </a>
                  <a
                    href="https://techmiyaedtech.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-gray-700 hover:text-deepseek-blue transition-colors"
                  >
                    techmiya Ed-tech
                  </a>
                  <a
                    href="https://techmiyaprojects.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-gray-700 hover:text-deepseek-blue transition-colors"
                  >
                    techmiya Projects
                  </a>
                </div>
              </div>
            )} */}
          </div>
          
          <a 
            href="/about"
            
            className="text-lg text-gray-700 hover:text-deepseek-blue transition-colors w-full py-3 border-b border-gray-100"
          >
            About Us
          </a>
          <a 
            href="/contact"
           
            className="text-lg text-gray-700 hover:text-deepseek-blue transition-colors w-full py-3 border-b border-gray-100"
          >
            Contact Us
          </a>
          
          <Button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/login');
            }}
            className="bg-deepseek-blue hover:bg-deepseek-blue/90 text-white px-6 py-2 rounded-md mt-6 w-full"
          >
            Start Now
          </Button>
        </div>
      </div>
      
      {/* Overlay when menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Announcement banner */}
      <div className="w-full bg-white/50 backdrop-blur-sm py-2 px-4 text-center text-gray-600 mb-10 mt-5 sm:block">
        <p className="flex flex-row items-center justify-center gap-2 text-sm max-w-3xl mx-auto">
          <span><strong>TinyAI v1</strong> – your AI assistant. Built for creators, coders, and thinkers.
          <a href="/aboutmodel" className="text-gray-600 underline hover:text-blue-800">Click here</a></span>
        </p>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Mobile view */}
        <div className="text-center mb-8 md:hidden">
          <h1 className="text-deepseek-blue text-6xl md:text-8xl font-bold mb-4">
           TinyAI
          </h1>
          <h2 className="text-gray-700 text-xl">
            Flow of Features
          </h2>
        </div>

        {/* Web / Desktop view */}
        <div className="text-center mb-12 hidden md:block">
          <h1 className="text-deepseek-blue text-7xl md:text-8xl font-bold mb-6">
           TinyAI
          </h1>
          <h2 className="text-gray-700 text-3xl md:text-4xl">
            Flow of Features
          </h2>
        </div>

        {/* Cards */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-1 gap-6 mb-16">
          {/* Start Now Card */}
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Start Now</h3>
            <p className="text-gray-600 mb-4">
              Explore the power of <strong>TinyAI</strong> – an intelligent AI assistant built to supercharge productivity for developers, designers, and innovators alike.  
              From generating smart code suggestions to brainstorming ideas, TinyAI adapts to your creative flow seamlessly.
            </p>

            <Button 
              onClick={() => navigate('/login')}
              className="bg-deepseek-blue hover:bg-deepseek-blue/90 text-white px-6 py-2 rounded-md"
            >
              Start Now
            </Button>
          </div>
        </div>

        {/* LLM & AI Info Cards Section */}
        <section className="w-full bg-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-deepseek-blue mb-12">
              Explore the World of LLMs & AI
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* What is an LLM */}
              <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What is an LLM?</h3>
                <p className="text-gray-600 text-sm">
                  A Large Language Model (LLM) is a deep learning model trained on massive text data to understand and generate human-like language.
                </p>
              </div>

              {/* Training Process */}
              <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How LLMs are Trained</h3>
                <p className="text-gray-600 text-sm">
                  LLMs learn by processing billions of tokens from diverse datasets using architectures like transformers and optimizing via gradient descent.
                </p>
              </div>

              {/* Data Management */}
              <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Managing Training Data</h3>
                <p className="text-gray-600 text-sm">
                  High-quality datasets are curated, filtered, and deduplicated to ensure models learn accurately and avoid biases or repetition.
                </p>
              </div>

              {/* Inference and Usage */}
              <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How LLMs Generate Text</h3>
                <p className="text-gray-600 text-sm">
                  During inference, LLMs predict the next word/token based on context, allowing them to answer questions, write code, or generate stories.
                </p>
              </div>

              {/* Fine-Tuning and Customization */}
              <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Fine-Tuning Models</h3>
                <p className="text-gray-600 text-sm">
                  Fine-tuning adapts a base model to specific tasks or industries using smaller, task-specific datasets and continued training.
                </p>
              </div>

              {/* Applications of LLMs */}
              <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-World Applications</h3>
                <p className="text-gray-600 text-sm">
                  LLMs power virtual assistants, code generation, content writing, customer support, translation, and even scientific discovery.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-1 gap-6 mb-16 mt-16">
          {/* Get App Card */}
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Get TinyAI App</h3>

            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              {/* Left side: Text and Button */}
              <div className="flex-1">
                <p className="text-gray-600 mb-4">
                  Chat on the go with <strong>TinyAI v1</strong> – your intelligent companion for coding, writing, and brainstorming.<br />
                  Designed for creators and thinkers, it's your all-in-one AI tool – free, fast, and reliable.
                </p>

                <Button 
                  variant="outline"
                  className="border-gray-400 text-gray-400 cursor-not-allowed"
                  disabled
                >
                  Coming Soon
                </Button>
              </div>

              {/* Right side: QR Placeholder with clear text */}
              <div className="relative w-40 h-40">
                <div className="w-full h-full bg-gray-300 blur-sm rounded-md"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-700 text-sm font-semibold bg-white/90 px-2 py-1 rounded-md shadow">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-6 bg-white/80">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-deepseek-blue text-sm">TinyAI Chat</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-deepseek-blue text-sm">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-deepseek-blue text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-deepseek-blue text-sm">Research</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-deepseek-blue text-sm">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-deepseek-blue text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-deepseek-blue text-sm">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-deepseek-blue text-sm">Terms</a></li>
                <li><a href="#" className="text-gray-600 hover:text-deepseek-blue text-sm">Privacy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-deepseek-blue text-sm">Copyright</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
            © 2025 TinyAI . All rights reserved.
          </div>
        </div>
      </footer>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 bg-[url('data:image/svg+xml;base64,...')] bg-cover bg-bottom -z-10" />
    </div>
  );
};

export default Home;