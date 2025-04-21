import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-scroll';
import shaktiLogo from '../assets/shakti full logo trac.png'; // replace with your actual logo path
import backgroundVideo from '../assets/bg-video.mp4'; // replace with your video path

const styles = {
  section: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
  },
  videoBackground: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  slideshowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // dark overlay
    zIndex: 1,
  },
  welcomeContent: {
    position: 'relative',
    textAlign: 'center',
    zIndex: 2,
    padding: '80px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // light transparent white
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)', // for Safari
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
  },
  
  logoImage: {
    width: '280px',
    marginBottom: '20px',
  },
  mainHeading: {
    fontSize: '48px',
    margin: '10px 0',
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: '28px',
    marginBottom: '30px',
  },
  learnMoreButton: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#ffffff',
    color: '#000',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    borderRadius: '25px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

const WelcomeSection = () => {
  const videoRef = useRef(null);  // Create a ref to access the video element

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Slow down the video speed (0.5 is half-speed)
    }
  }, []);  // This effect will run once when the component mounts

  return (
    <section id="welcome" style={styles.section}>
      <div style={styles.videoContainer}>
        <video 
          ref={videoRef}  // Reference the video element to control it
          autoPlay 
          loop 
          muted 
          playsInline 
          style={styles.videoBackground}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={styles.slideshowOverlay}></div>
      </div>

      <div style={styles.welcomeContent}>
        <img src={shaktiLogo} alt="Shakti Electrotech Logo" style={styles.logoImage} />
        <h1 style={styles.mainHeading}>YOU JUST THINK</h1>
        <h2 style={styles.subHeading}>WE WILL DO IT</h2>
        <Link
          to="about"
          spy={true}
          smooth={true}
          duration={500}
          style={styles.learnMoreButton}
        >
          More about us
        </Link>
      </div>
    </section>
  );
};

export default WelcomeSection;
