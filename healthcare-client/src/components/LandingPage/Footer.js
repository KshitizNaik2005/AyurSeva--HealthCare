// import React from 'react';
// import logoImage from '../../assets/images/logo.png';

// import './Footer.css';

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-top">
//         <div className="container">
//           <div className="footer-content">
//             <div className="footer-main">
//               <h2 className="footer-title font-inspiration">Bring Ayurveda into the Digital Era</h2>
//               <button className="footer-cta-btn font-kaushan">Book a demo</button>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="footer-bottom">
//         <div className="container-footer">
//           <div className="footer-grid">
//             <div className='img-logo-footer'>
//               <img src={logoImage} alt="AyurSeva footer"  />
//             </div>
//             <div className="footer-section">
//               <h3 className="footer-section-title font-inspiration">Quick links</h3>
//               <ul className="footer-links">
//                 <li><a href="#AboutUs" className="footer-link font-kite">About Us</a></li>
//                 <li><a href="#how-it-works" className="footer-link font-kite">How it works</a></li>
//                 <li><a href="#features" className="footer-link font-kite">Features</a></li>
//               </ul>
//             </div>
            
//             <div className="footer-section">
//               <h3 className="footer-section-title font-inspiration">Why choose us</h3>
//               <p className="footer-description font-kite">Modern Care for Ancient Healing</p>
//             </div>
            
//             <div className="footer-section">
//               <h3 className="footer-section-title font-inspiration">Contacts</h3>
//               <div className="contact-info">
//                 <p className="contact-item font-kite">📧 ayurseva@gmail.com</p>
//                 <p className="contact-item font-kite">📞 +91 XXX XXXX XXX</p>
//               </div>
//             </div>
//           </div>
//           <br></br>
//           <div className="footer-copyright">
//             <p className="copyright-text font-kite">© 2025 AyurSeva. All rights reserved.</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/images/logo.png';

import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-content">
            <div className="footer-main">
              <h2 className="footer-title font-inspiration">Bring Ayurveda into the Digital Era</h2>
              <button 
                className="footer-cta-btn font-kaushan"
                onClick={() => navigate('/register')}
              >
                Book a demo
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container-footer">
          <div className="footer-grid">
            <div className='img-logo-footer'>
              <img src={logoImage} alt="AyurSeva footer" />
            </div>
            
            <div className="footer-section">
              <h3 className="footer-section-title font-inspiration">Quick links</h3>
              <ul className="footer-links">
                <li><a href="#AboutUs" className="footer-link font-kite">About Us</a></li>
                <li><a href="#how-it-works" className="footer-link font-kite">How it works</a></li>
                <li><a href="#features" className="footer-link font-kite">Features</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3 className="footer-section-title font-inspiration">Why choose us</h3>
              <p className="footer-description font-kite">Modern Care for Ancient Healing</p>
            </div>
            
            <div className="footer-section">
              <h3 className="footer-section-title font-inspiration">Contacts</h3>
              <div className="contact-info">
                <p className="contact-item font-kite">📧 ayurseva@gmail.com</p>
                <p className="contact-item font-kite">📞 +91 XXX XXXX XXX</p>
              </div>
            </div>
          </div>
          <br />
          <div className="footer-copyright">
            <p className="copyright-text font-kite">© 2025 AyurSeva. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
