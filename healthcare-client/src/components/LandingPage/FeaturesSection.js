import React, {useEffect} from "react";
import "./FeaturesSection.css";
import therapyImage from "../../assets/images/features-image.png"
function Panchakarma() {
  
  return (
    <div className="panchakarma-section" >
      {/* Top Features Row */}
      <div className="features-row" id="features">
        <div className="features-card">
          <h3>Automated Scheduling</h3>
          <p>Plan, modify, and manage sessions with ease.</p>
        </div>
        <div className="features-card">
          <h3>Smart Notifications</h3>
          <p>Pre- & post-procedure alerts via app, SMS, or email.</p>
        </div>
        <div className="features-card">
          <h3>Therapy Tracking</h3>
          <p>Real-time progress, milestones, and session history.</p>
        </div>
        <div className="features-card">
          <h3>Feedback Loop</h3>
          <p>
            Patients share recovery experiences, practitioners refine care.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="panchakarma-content">
        {/* Left Image */}
        <div className="panchakarma-image">
          <img src={therapyImage} alt="Panchakarma Cycle" />
        </div>

        {/* Right Text */}
        <div className="panchakarma-text fontKaisei Tokumin">
          <h1>Why Panchakarma Needs Digital Support</h1>
          <p>
            Panchakarma is globally recognized for detoxification and
            rejuvenation.
          </p>
          <p>
            Rising demand but manual systems = inefficiency, inconsistency,
            limited patient management.
          </p>
          <p>
            AyurSutra bridges the gap between Ayurveda tradition and modern
            efficiency.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Panchakarma;
