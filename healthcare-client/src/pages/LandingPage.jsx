import React from 'react';
import {
  HeartPulse,
  FileUp,
  CalendarClock,
  MessageCircle,
  FolderOpen,
  Stethoscope
} from 'lucide-react';

const SmartHealthcareLandingPage = () => {
  const features = [
    { icon: <HeartPulse className="w-6 h-6 text-green-700 mb-2" />, title: 'AI-based Disease Prediction' },
    { icon: <FileUp className="w-6 h-6 text-green-700 mb-2" />, title: 'Upload Health Reports' },
    { icon: <CalendarClock className="w-6 h-6 text-green-700 mb-2" />, title: 'Instant Appointment Booking' },
    { icon: <MessageCircle className="w-6 h-6 text-green-700 mb-2" />, title: 'Doctor-Patient Secure Chat' },
    { icon: <FolderOpen className="w-6 h-6 text-green-700 mb-2" />, title: '24/7 Medical Record Access' },
    { icon: <Stethoscope className="w-6 h-6 text-green-700 mb-2" />, title: 'AI Symptom Checker' }
  ];

  return (
    <div
      className="font-sans text-gray-800 bg-cover bg-fixed bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/medical-background.jpg')" }}
    >
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-md bg-white bg-opacity-80">
        <h1 className="text-2xl font-bold text-green-700">Smart-Healthcare</h1>
        <nav className="space-x-6 hidden md:block">
          <a href="#about" className="text-gray-700 hover:text-green-600">About</a>
          <a href="#features" className="text-gray-700 hover:text-green-600">Features</a>
          <a href="#services" className="text-gray-700 hover:text-green-600">Services</a>
          <a href="#contact" className="text-gray-700 hover:text-green-600">Contact</a>
          <a href="/register" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Make an Appointment</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center bg-green-50 bg-opacity-70 px-8 py-16">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-5xl font-light text-green-800 leading-tight">
            Health is wealth<br />keep it healthy
          </h2>
          <p className="text-gray-600">Empowering your well-being through AI-driven healthcare insights and doctor collaboration.</p>
          <div className="mt-8">
            <a href="/register" className="bg-green-800 text-white px-6 py-3 rounded hover:bg-green-900 w-fit">Take a Service</a>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          

          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <div className="w-80 h-96 overflow-hidden rounded-2xl shadow-[0_0_25px_rgba(34,197,94,0.5)] transform rotate-3 hover:rotate-0 transition-all duration-500 ease-in-out hover:shadow-[0_0_35px_rgba(34,197,94,0.9)]">
          <img
              src="/doctor-hero.jpg"
              alt="Doctor"
              className="w-full h-full object-cover"/>
          </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-8 bg-white bg-opacity-80">
        <h3 className="text-3xl font-bold text-center mb-12 text-green-800">Smart Healthcare Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl shadow-lg backdrop-blur-md bg-white/40 border border-white/30 transition-all hover:scale-105"
            >
              {item.icon}
              <h4 className="text-xl font-semibold text-green-700 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-700">
                Seamless, smart, and secure health management at your fingertips.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="services" className="py-16 px-8 bg-gray-50 bg-opacity-80">
        <h3 className="text-3xl font-bold text-center mb-12 text-green-800">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Sign Up & Select Role', desc: 'Patient, Doctor, or Admin — register and get started.' },
            { title: 'Input Health Data', desc: 'Upload your reports or describe symptoms in real-time.' },
            { title: 'Get Smart Results', desc: 'AI and doctors guide you with personalized insights.' }
          ].map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded shadow text-center">
              <div className="text-green-600 text-3xl font-bold mb-2">Step {idx + 1}</div>
              <h4 className="text-xl font-semibold mb-2 text-green-800">{step.title}</h4>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctor Team */}
      <section id="team" className="py-16 px-8 bg-white bg-opacity-80">
        <h3 className="text-3xl font-bold text-center mb-12 text-green-800">Meet Our Specialists</h3>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-4 rounded shadow">
              <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4"></div>
              <h5 className="font-semibold text-green-700">Dr. Expert {i}</h5>
              <p className="text-sm text-gray-500">Cardiologist</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-green-800 text-white px-8 py-16 text-center bg-opacity-90">
        <h3 className="text-3xl font-bold mb-4">Take control of your health today</h3>
        <p className="mb-6">Join Smart-Healthcare and experience the future of digital healthcare.</p>
        <a href="/register" className="bg-yellow-400 text-green-900 font-bold px-6 py-3 rounded hover:bg-yellow-300">Make an Appointment</a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 px-8 text-sm text-center text-gray-600 bg-opacity-80">
        <p>&copy; {new Date().getFullYear()} Smart-Healthcare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SmartHealthcareLandingPage;
