import React from 'react';
import patientExp1 from '../../assets/images/patient-experience-1.png';
import patientExp2 from '../../assets/images/patient-experience-1.png'; // Using same image as placeholder
import './PatientPractitionerExperience.css';

const PatientPractitionerExperience = () => {
  const patientFeatures = [
    "- Easy appointment booking",
    "- Reminders for therapies & precautions",
    "- Progress tracking dashboard",
    "- Personalized health journey"
  ];

  const practitionerFeatures = [
    "- Manage multiple patients effortlessly",
    "- Track therapy schedules in one place",
    "- Collect structured feedback",
    "- Generate progress & compliance reports"
  ];

  return (
    <section className="patient-practitioner-section">
      <div className="container">
        <div className="experience-content">
          <div className="patient-experience">
            <div className="experience-header">
              <h2 className="experience-title font-kaisei">Patient Experience</h2>
            </div>
            
            <div className="experience-content-grid">
              <div className="experience-image-container">
                <img src={patientExp1} alt="Patient experience" className="experience-image" />
              </div>
              
              <div className="experience-features">
                {patientFeatures.map((feature, index) => (
                  <p key={index} className="feature-item font-kaisei">{feature}</p>
                ))}
              </div>
            </div>
          </div>
          
          <div className="practitioner-experience">
            <div className="experience-header">
              <h2 className="experience-title font-kaisei">Practitioner Experience</h2>
            </div>
            
            <div className="experience-content-grid">
              <div className="experience-image-container">
                <img src={patientExp2} alt="Practitioner experience" className="experience-image" />
              </div>
              
              <div className="experience-features">
                {practitionerFeatures.map((feature, index) => (
                  <p key={index} className="feature-item font-kaisei">{feature}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientPractitionerExperience;
