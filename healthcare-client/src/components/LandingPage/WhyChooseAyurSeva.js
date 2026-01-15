import React from 'react';
import featuresImage from '../../assets/images/doctor.png';
import './WhyChooseAyurSeva.css';

const WhyChooseAyurSeva = () => {
  // const features = [
  //   {
  //     number:"1",
  //     title: "Automated Scheduling",
  //     description: "Plan, modify, and manage sessions with ease."
  //   },
  //   {
  //     number:"2",
  //     title: "Smart Notifications",
  //     description: "Pre- & post-procedure alerts via app, SMS, or email."
  //   },
  //   {
  //     number:"3",
  //     title: "Therapy Tracking",
  //     description: "Real-time progress, milestones, and session history."
  //   },
  //   {
  //     number:"4",
  //     title: "Feedback Loop",
  //     description: "Patients share recovery experiences, practitioners refine care."
  //   }
  // ];

  const benefits = [
    "- Saves time with automated scheduling.",
    "- Improves therapy quality across centers.",
    "- Enhances patient trust with clear communication.",
    "- Provides real-time data for better decisions.",
    "- Scales easily for Ayurveda centers of any size."
  ];

  return (
    <section className="why-choose-section" id="AboutUs">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title font-kaisei">Our Mission: Authentic Healing with Modern Care</h2>
        </div>
        
        <div className="why-choose-content" id='AboutUs'>
          
          <div className='mission' >
            <p>
              At AyurSutra, we believe Ayurveda deserves the efficiency of today’s technology. Our mission is to enhance Panchakarma therapy management by combining traditional authenticity with digital innovation. We strive to empower practitioners, simplify patient journeys, and elevate the global presence of Ayurveda
            </p>

          </div>
          
          <div className="benefits-section">
            <div className="benefits-image-container">
              <img src={featuresImage} alt="AyurSeva features" className="benefits-image" />
            </div>
            
            <div className="benefits-list">
              <h2>
                Why Choose AyurSeva?
              </h2>
              {benefits.map((benefit, index) => (
                <p key={index} className="benefit-item font-karma">{benefit}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAyurSeva;
