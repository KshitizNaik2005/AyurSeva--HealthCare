// import React from 'react';
// import heroImage from '../../assets/images/hero-image.png';
// import './HeroSection.css';

// const HeroSection = () => {
//   return (
//     <section className="hero-section" id="home">
//       <div className="container">
//         <div className="hero-content">
//           {/* Left side - Natural healing elements image */}
//           <div className="hero-left">
//             <div className="hero-image-container">
//               <img src={heroImage} alt="Natural healing elements" className="hero-image" />
//             </div>
//           </div>
          
//           {/* Right side - Text content and CTA */}
//           <div className="hero-right">
//             <div className="hero-text-content">
//               <h1 className="hero-title font-inspiration">
//                 Modern Care for<br />Ancient Healing
//               </h1>
              
//               <p className="hero-description font-kaisei">
//                 Streamlined scheduling, real-time tracking, and patient-focused Panchakarma care.
//               </p>
              
//               <button className="hero-cta-btn font-kaushan">
//                 Book a demo
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/images/hero-image.png';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-content">
          {/* Left side - Natural healing elements image */}
          <div className="hero-left">
            <div className="hero-image-container">
              <img src={heroImage} alt="Natural healing elements" className="hero-image" />
            </div>
          </div>
          
          {/* Right side - Text content and CTA */}
          <div className="hero-right">
            <div className="hero-text-content">
              <h1 className="hero-title font-inspiration">
                Modern Care for<br />Ancient Healing
              </h1>
              
              <p className="hero-description font-kaisei">
                Streamlined scheduling, real-time tracking, and patient-focused Panchakarma care.
              </p>
              
              <button 
                className="hero-cta-btn font-kaushan"
                onClick={() => navigate('/register')}
              >
                Book a demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
