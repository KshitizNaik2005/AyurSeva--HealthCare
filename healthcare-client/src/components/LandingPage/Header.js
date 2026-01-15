// import React from 'react';
// import logoImage from '../../assets/images/logo.png';
// import './Header.css';

// const Header = () => {
//   return (
//     <header className="header">
//       <div className="container">
//         <nav className="nav">
//           {/* Logo Section */}
//           <div className="nav-left">
//             <div className="logo-container">
//               <img src={logoImage} alt="AyurSeva Logo" className="logo-image" />
//             </div>
//           </div>
          
//           {/* Navigation Menu */}
//           <div className="nav-center">
//             <ul className="nav-menu">
//               <li><a href="#home" className="nav-link font-kaushan">Home</a></li>
//               <li><a href="#features" className="nav-link font-kaushan">Features</a></li>
//               <li><a href="#AboutUs" className="nav-link font-kaushan">About Us</a></li>
//               <li><a href="#how-it-works" className="nav-link font-kaushan">How it works</a></li>
//             </ul>
//           </div>
          
//           {/* Action Buttons */}
//           <div className="nav-right">
//             <button className="btn btn-signin font-kaushan">Sign-Up</button>
//           </div>
//         </nav>
        
//         {/* Golden line separator */}
//         <div className="nav-separator"></div>
//       </div>
//     </header>
//   );
// };

// export default Header;




import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/images/logo.png';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          {/* Logo Section */}
          <div className="nav-left">
            <div className="logo-container">
              <img src={logoImage} alt="AyurSeva Logo" className="logo-image" />
            </div>
          </div>
          
          {/* Navigation Menu */}
          <div className="nav-center">
            <ul className="nav-menu">
              <li><a href="#home" className="nav-link font-kaushan">Home</a></li>
              <li><a href="#features" className="nav-link font-kaushan">Features</a></li>
              <li><a href="#AboutUs" className="nav-link font-kaushan">About Us</a></li>
              <li><a href="#how-it-works" className="nav-link font-kaushan">How it works</a></li>
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="nav-right">
            <button 
              className="btn btn-signin font-kaushan"
              onClick={() => navigate('/register')}
            >
              Sign-Up
            </button>
          </div>
        </nav>
        
        {/* Golden line separator */}
        <div className="nav-separator"></div>
      </div>
    </header>
  );
};

export default Header;
