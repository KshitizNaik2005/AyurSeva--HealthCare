import React from 'react';
import howItWorksImage from '../../assets/images/how-it-works-image.png';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      number: "1.",
      title: "Patient books or practitioner schedules therapy."
    },
    {
      number: "2.",
      title: "System sends notifications for preparation and aftercare."
    },
    {
      number: "3.",
      title: "Sessions tracked with progress indicators."
    },
    {
      number: "4.",
      title: "Patients provide feedback; reports generated automatically."
    }
  ];

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title font-kaisei">How it works?</h2>
        </div>
        
        <div className="how-it-works-content">
          <div className="steps-container">
            <div className="steps-grid">
              {steps.map((step, index) => (
                <div key={index} className="step-item">
                  <div className="step-number font-inspiration">{step.number}</div>
                  <div className="step-content">
                    <p className="step-description font-kaisei">{step.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="how-it-works-image-container">
            <img src={howItWorksImage} alt="How it works illustration" className="how-it-works-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
