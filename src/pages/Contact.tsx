import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Globe, MessageSquare, User } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission here
    if (formData.name && formData.email && formData.subject && formData.message) {
      console.log('Form submitted:', formData);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    
    <div className="bg-white py-16">
     
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Contact Us</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team to discuss your technology needs and discover how we can help transform your business.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <Mail className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Send us an email and we'll respond within 24 hours</p>
            <a 
              href="mailto:ai@gmail.com"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              ai@gmail.com
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <Phone className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Speak directly with our experts</p>
            <a 
              href="tel:123456789"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              123-456-789
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <Clock className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Hours</h3>
            <p className="text-gray-600 mb-2">Monday - Friday</p>
            <p className="text-blue-600 font-medium">9:00 AM - 6:00 PM</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <MessageSquare className="text-blue-600 mr-3" size={24} />
              Send us a Message
            </h3>
            <div className="space-y-6">
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>
            </div>
          </div>

          {/* Contact Information & Team */}
          <div className="space-y-8">
            {/* Why Choose Us */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose  Solutions?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-600">Expert team with years of experience in cutting-edge technologies</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-600">Custom solutions tailored to your specific business needs</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-600">24/7 support and ongoing maintenance services</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-600">Proven track record of successful project deliveries</p>
                </div>
              </div>
            </div>

            {/* Contact Person */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="text-blue-600 mr-3" size={24} />
                Your Contact Person
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mr-4">
                    <User className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Name</h4>
                    <p className="text-gray-600">Business Development Manager</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Jhon doe will be your primary point of contact for all inquiries and project discussions. 
                  With extensive experience in technology solutions, Ysin ensures seamless communication 
                  and project delivery.
                </p>
              </div>
            </div>

            {/* Services Overview */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Globe className="text-blue-600 mr-3" size={24} />
                Our Services
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium text-center">
                  Software Development
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium text-center">
                  AI Solutions
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium text-center">
                  Cloud Migration
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium text-center">
                  IT Consulting
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-blue-600 text-white p-8 rounded-lg text-center mt-16">
          <h3 className="text-2xl font-semibold mb-4">Ready to Get Started?</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Don't hesitate to reach out! Our team is ready to discuss your project and provide you with a customized solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:ai@gmail.com"
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Mail size={18} />
              Email Us Now
            </a>
            <a
              href="tel:123456789"
              className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;