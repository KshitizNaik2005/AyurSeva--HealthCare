
// src/components/SplashScreen.jsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // Redirect when animation ends
      video.onended = () => {
        navigate("/landing");
      };
    }

    // Backup: in case video fails to play
    const timer = setTimeout(() => navigate("/landing"), 6000); // adjust to video length
    return () => clearTimeout(timer);

  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black">
      <video
        ref={videoRef}
        src="/animation.mp4"
        autoPlay
        muted
        playsInline
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default SplashScreen;
