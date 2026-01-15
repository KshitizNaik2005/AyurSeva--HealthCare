import React from "react";
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorks from './HowItWorks';
import WhyChooseAyurSeva from './WhyChooseAyurSeva';
import PatientPractitionerExperience from './PatientPractitionerExperience';
import Footer from './Footer';
import './Land.css';

export default function Land() {
    return (
        <div className="land">
            <Header />
            <HeroSection />
            <FeaturesSection />
            <HowItWorks />
            <WhyChooseAyurSeva />
            <PatientPractitionerExperience />
            <Footer />
        </div>
    );
}
