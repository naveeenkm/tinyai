import React from 'react';
import { User, Code, Cpu, Database, Cloud, Globe, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">About  TinyAI</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A leading technology company delivering innovative IT solutions and services to businesses worldwide.
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Who We Are</h3>
            <p className="text-gray-600 mb-6">
               TinyAI is a dynamic technology company committed to delivering cutting-edge 
              IT solutions that drive business growth and efficiency. Since our founding, we have been
              at the forefront of technological innovation, helping organizations transform their operations
              and achieve their digital goals.
            </p>
            <p className="text-gray-600 mb-6">
              Our team consists of passionate professionals with expertise across various domains of technology. 
              We take pride in our customer-centric approach, ensuring that each solution we deliver is 
              tailored to meet the unique needs and challenges of our clients.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Software Development</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">IT Consulting</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Cloud Solutions</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">AI Integration</span>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-gray-600 mb-4">
              At  TinyAI, our mission is to empower businesses with innovative technology solutions
              that enhance productivity, drive growth, and create sustainable value.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 mt-8">Our Vision</h3>
            <p className="text-gray-600">
              To be the global leader in delivering transformative technology solutions that help
              businesses thrive in the digital age.
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Code className="text-blue-600 mr-3" size={24} />
                <h4 className="text-xl font-medium text-gray-900">Custom Software Development</h4>
              </div>
              <p className="text-gray-600">
                Tailored software solutions designed to address your unique business challenges and requirements.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Cloud className="text-blue-600 mr-3" size={24} />
                <h4 className="text-xl font-medium text-gray-900">Cloud Migration & Hosting</h4>
              </div>
              <p className="text-gray-600">
                Seamless migration to cloud platforms with ongoing support and optimization services.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Database className="text-blue-600 mr-3" size={24} />
                <h4 className="text-xl font-medium text-gray-900">Data Management</h4>
              </div>
              <p className="text-gray-600">
                Comprehensive data solutions including database design, migration, and analytics.
              </p>
            </div>
          </div>
        </div>

        {/* AI Section */}
        <div className="bg-gray-50 p-8 rounded-lg shadow mb-20">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Our AI Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Cpu className="text-blue-600 mr-3" size={24} />
                <h4 className="text-xl font-medium text-gray-900">AI Solutions</h4>
              </div>
              <p className="text-gray-600 mb-6">
                We leverage cutting-edge artificial intelligence technologies to help businesses automate processes, 
                gain insights from data, and enhance decision-making capabilities. Our team of AI specialists 
                develops custom solutions tailored to your unique business needs.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Machine Learning Integration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Natural Language Processing Solutions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Predictive Analytics Implementation</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <Globe className="text-blue-600 mr-3" size={24} />
                <h4 className="text-xl font-medium text-gray-900">AI for Business Transformation</h4>
              </div>
              <p className="text-gray-600 mb-6">
                Our AI solutions help businesses across various industries transform their operations and 
                create new opportunities for growth. We focus on practical applications of AI that deliver 
                tangible business value and competitive advantages.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">AI-Powered Customer Service Solutions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Intelligent Process Automation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Computer Vision Applications</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Section */}
        {/* <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Our Expert Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <User className="text-blue-600" size={24} />
              </div>
              <h4 className="text-lg font-medium text-gray-900">John Smith</h4>
              <p className="text-gray-600">Chief Technology Officer</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <User className="text-blue-600" size={24} />
              </div>
              <h4 className="text-lg font-medium text-gray-900">Sarah Johnson</h4>
              <p className="text-gray-600">AI Solutions Director</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <User className="text-blue-600" size={24} />
              </div>
              <h4 className="text-lg font-medium text-gray-900">Michael Wong</h4>
              <p className="text-gray-600">Lead Software Architect</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <User className="text-blue-600" size={24} />
              </div>
              <h4 className="text-lg font-medium text-gray-900">Lisa Chen</h4>
              <p className="text-gray-600">Data Science Lead</p>
            </div>
          </div>
        </div> */}

        {/* Call to Action */}
        {/* <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to Work With Us?</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Let's collaborate to bring your technology vision to life. Contact our team today to discuss your project.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors">
            Contact Us
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default About;