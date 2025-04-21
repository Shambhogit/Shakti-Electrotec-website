import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FiSun, FiMoon } from 'react-icons/fi';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


// Import all product images
import andonControl1 from '../assets/andon control 1.jpg';
import analogTransmitter1 from '../assets/analog input trasmeter 2.png';
import analogTransmitter2 from '../assets/analog input trasmeter 3.png';
import batteryEliminator from '../assets/battery eliminator paqnel 1.png';
import continuityPanel from '../assets/cb contuanity testing panel 2.png';
import continuityUnit1 from '../assets/contuanity testing unit 1.png';
import continuityUnit2 from '../assets/contuanity testing unit 2.png';
import dataLogger16Ch from '../assets/data logger 16 ch.png';
import dataLogger from '../assets/data looger.jpg';
import medicalCallPoint from '../assets/medical emergancy call point .png';
import medicalEmergencyPoint from '../assets/medical emergancy point.png';
import mhmsDashboard from '../assets/mhms 4 .png';
import mhmsSystem from '../assets/mhms 5.png';
import vltMeter from '../assets/vlt ir rejection meter 2.jpg';
import shaktiLogo from '../assets/shakti full logo trac.png';
import hmiTouchScreen from '../assets/hmi touch screen 1.png';
import solarEnergyMeter from '../assets/solar energy meter 1.png';
import fuelGaugeUnit from '../assets/fuel gaege testing unit big .png';

import research from '../assets/research.png'
import renewable from '../assets/renewable.png'
import healthcare from '../assets/healthcare.png'
import power from '../assets/power.png'
import food from '../assets/food.png'
import pharmaceutical from '../assets/pharmaceutical.png'
import automotive from '../assets/automotive.png'
import manufacturing from '../assets/manufacturing.png'

// Background images for slideshow
import bg1 from '../assets/hmi touch screen 1.png';
import bg2 from '../assets/mhms 5.png';
import bg3 from '../assets/solar energy meter 1.png';
import bg4 from '../assets/fuel gaege testing unit big .png';
import bg5 from '../assets/andon control 1.jpg';
import ExploreMoreButton from '../components/ExploreMoreButton';
import WelcomeSection from '../components/WelcomeSection';
import IndustriesCard from '../components/IndustriesCard';
import ProductCard from '../components/ProductCard';

function Home() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [products, setProducts] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const backgroundImages = [bg1, bg2, bg3, bg4, bg5];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navItems = [
    { id: 'welcome', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'products', label: 'Products' },
    { id: 'industries', label: 'Industries' },
    { id: 'clients', label: 'Clients' },
    { id: 'contact', label: 'Contact' }
  ];

  const services = [
    {
      title: "PLC Panels & Automation",
      icon: "⚙",
      description: "We specialize in designing and developing high-performance Programmable Logic Controller (PLC) panels for industrial automation.",
      features: [
        "Custom-built PLC panels for specific industry needs",
        "Seamless integration with existing systems",
        "Brands we work with: Siemens, Allen-Bradley, Schneider",
        "Reliable after-sales support and maintenance"
      ],
      images: [hmiTouchScreen]
    },
    {
        title: "Touch Screen Panels (HMI)",
        icon: "👆",
        description: "Our Human-Machine Interface (HMI) panels are designed for intuitive operation in industrial environments with real-time data visualization capabilities.",
        features: [
          "Custom GUI design tailored to your workflow",
          "Integration with PLC & SCADA systems",
          "Rugged, industrial-grade touch screens",
          "User-friendly interfaces for easy monitoring"
        ],
        images: [hmiTouchScreen]
      },
      {
        title: "Control Panels",
        icon: "🎛",
        description: "From motor control centers to specialized testing panels, we provide complete control solutions for industrial automation.",
        features: [
          "Testing control & motor control solutions",
          "Safety-compliant designs meeting industry standards",
          "Tailored solutions for unique applications",
          "High-quality components for reliability"
        ],
        images: [continuityPanel]
      },
      {
        title: "Testing Equipment",
        icon: "🔍",
        description: "We develop precision testing equipment for quality control in electrical and electronic industries.",
        features: [
          "Automated testing rigs for electronics",
          "Customized solutions for R&D labs",
          "Calibration & reliability testing systems",
          "Data logging and analysis capabilities"
        ],
        images: [fuelGaugeUnit]
      }
  ];

  const clients = [
    {
      name: "Bajaj Auto Limited",
      location: "Waluj, Chh. Sambhajinagar",
      testimonial: "Shakti's automation solutions increased our production efficiency by 30% while reducing downtime by 45%."
    },
    {
        name: "Garware Polyester Limited",
        location: "Chikalthana, Chh. Sambhajinagar",
        testimonial: "Their control panels have been running flawlessly for 5+ years with minimal maintenance requirements."
      },
      {
        name: "Siemens Ltd.",
        location: "Waluj, Chh. Sambhajinagar",
        testimonial: "Excellent technical support and reliable products that integrate seamlessly with our existing systems."
      }
  ];

  const industries = [
    { name: "Manufacturing", icon: manufacturing, description: "Custom automation for production lines" },
    { name: "Automotive", icon: automotive, description: "Robotics and assembly line solutions" },
    { name: "Pharmaceutical", icon: pharmaceutical, description: "Precision control for sensitive processes" },
    { name: "Food Processing", icon: food, description: "Hygienic and efficient automation" },
    { name: "Power & Energy", icon: power, description: "Reliable control for critical systems" },
    { name: "Healthcare", icon: healthcare, description: "Medical equipment control systems" },
    { name: "Renewable Energy", icon: renewable, description: "Solar monitoring solutions" },
    { name: "R&D Labs", icon: research, description: "Specialized testing equipment" }
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/frontpage");
      // console.log(res);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/submissions', formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error(err);
    }
  };

  const themeStyles = {
    light: {
      backgroundColor: '#ffffff',
      textColor: '#333333',
      sectionBackground: '#f9f9f9',
      cardBackground: '#ffffff',
      buttonColor: '#d32f2f'
    },
    dark: {
      backgroundColor: '#121212',
      textColor: '#f5f5f5',
      sectionBackground: '#1e1e1e',
      cardBackground: '#2d2d2d',
      buttonColor: '#ff5252'
    }
  };

  const handleNavigateToProduct = ()=>{
    navigate('/products')
  }

  const currentTheme = darkMode ? themeStyles.dark : themeStyles.light;

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: currentTheme.textColor,
      backgroundColor: currentTheme.backgroundColor,
      lineHeight: 1.6,
      overflowX: 'hidden',
      transition: 'all 0.3s ease'
    },
    themeToggleButton: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: currentTheme.buttonColor,
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        fontSize: '20px',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        ':hover': {
          transform: 'scale(1.1)'
        }
      },
      section: {
        minHeight: '100vh',
        padding: '80px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        scrollSnapAlign: 'start'
      },
      welcomeSection: {
        color: 'white',
        textAlign: 'center',
        overflow: 'hidden'
      },
      slideshowContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
      },
      slideshowImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(4px) brightness(0.6)',
        transition: 'opacity 1s ease-in-out'
      },
      slideshowOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.3)',
        zIndex: 1
      },
      welcomeContent: {
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        padding: '0 20px'
      },
      logoImage: {
        maxWidth: '200px',
        marginBottom: '30px',
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
      },
      mainHeading: {
        fontSize: '3rem',
        fontWeight: 'bold',
        margin: '10px 0',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        lineHeight: '1.2'
      },
      subHeading: {
        fontSize: '2.2rem',
        fontWeight: 'bold',
        margin: '10px 0 30px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
      },
      learnMoreButton: {
        background: 'white',
        color: '#d32f2f',
        border: 'none',
        padding: '15px 40px',
        fontSize: '1.1rem',
        borderRadius: '30px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '30px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        ':hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
        },
        textDecoration: 'none',
        display: 'inline-block'
      },
      sectionTitle: {
        fontSize: '2.5rem',
        marginBottom: '50px',
        color: currentTheme.buttonColor,
        textAlign: 'center',
        position: 'relative',
        ':after': {
          content: '""',
          display: 'block',
          width: '80px',
          height: '4px',
          background: '#0288d1',
          margin: '15px auto 0'
        }
      },
      aboutContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      },
      aboutContent: {
        flex: 1,
        minWidth: '300px',
        fontSize: '1.1rem',
        lineHeight: '1.8'
      },
      aboutLogo: {
        width: '100%',
        maxWidth: '400px',
        height: 'auto',
        padding: '130px',
        objectFit: 'contain',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      },
      missionBox: {
        backgroundColor: darkMode ? '#2d2d2d' : '#e3f2fd',
        padding: '25px',
        borderRadius: '8px',
        marginTop: '30px',
        borderLeft: '5px solid #0288d1',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      },
      servicesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '25px',
        maxWidth: '1200px',
        margin: '0 auto'
      },
      serviceCard: {
        background: currentTheme.cardBackground,
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        ':hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 15px 30px rgba(0,0,0,0.15)'
        }
      },
      serviceHeader: {
        padding: '25px',
        background: '#0288d1',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      },
      serviceIcon: {
        fontSize: '2rem'
      },
      serviceTitle: {
        margin: 0,
        fontSize: '1.3rem'
      },
      servicePreview: {
        padding: '25px',
        background: currentTheme.cardBackground
      },
      learnMoreLink: {
        color: currentTheme.buttonColor,
        fontWeight: '600',
        marginTop: '15px',
        display: 'inline-block',
        transition: 'all 0.3s ease',
        ':hover': {
          transform: 'translateX(5px)'
        }
      },
      productsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      },
      productCard: {
        background: currentTheme.cardBackground,
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        ':hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 15px 30px rgba(0,0,0,0.15)'
        }
      },
      productImageContainer: {
        height: '200px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkMode ? '#3a3a3a' : '#f5f5f5'
      },
      productImage: {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        padding: '20px'
      },
      productInfo: {
        padding: '25px'
      },
      productTitle: {
        color: currentTheme.buttonColor,
        margin: '0 0 10px 0'
      },
      productDescription: {
        margin: '0 0 15px 0',
        color: currentTheme.textColor
      },
      viewDetails: {
        color: '#0288d1',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        ':hover': {
          transform: 'translateX(5px)'
        }
      },
      industriesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '30px 70px',
        maxWidth: '1200px',
        margin: '0 auto'
      },
      industryCard: {
        padding: '30px 20px',
        borderRadius: '8px',
        color: 'white',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        ':hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
        }
      },
      industryIcon: {
        fontSize: '2.5rem',
        marginBottom: '15px'
      },
      clientCarousel: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        maxWidth: '1000px',
        margin: '0 auto'
      },
      clientCard: {
        background: currentTheme.cardBackground,
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        ':hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 15px 30px rgba(0,0,0,0.15)'
        }
      },
      readTestimonial: {
        color: '#0288d1',
        fontWeight: '600',
        marginTop: '15px',
        display: 'inline-block',
        transition: 'all 0.3s ease',
        ':hover': {
          transform: 'translateX(5px)'
        }
      },
      contactContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto'
      },
      mapContainer: {
        flex: 1,
        minWidth: '300px',
        height: '450px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
      },
    formContainer: {
      flex: 1,
      minWidth: '300px'
    },
    formInput: {
      width: '100%',
      padding: '15px',
      marginBottom: '20px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      ':focus': {
        outline: 'none',
        borderColor: '#0288d1',
        boxShadow: '0 0 0 3px rgba(2,136,209,0.2)'
      }
    },
    formTextarea: {
      width: '100%',
      padding: '15px',
      marginBottom: '20px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
      minHeight: '150px',
      transition: 'all 0.3s ease',
      ':focus': {
        outline: 'none',
        borderColor: '#0288d1',
        boxShadow: '0 0 0 3px rgba(2,136,209,0.2)'
      }
    },
    submitButton: {
      background: currentTheme.buttonColor,
      color: 'white',
      border: 'none',
      padding: '15px 30px',
      fontSize: '1.1rem',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      width: '100%',
      ':hover': {
        background: darkMode ? '#ff6e6e' : '#b71c1c',
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(211,47,47,0.3)'
      }
    },
    contactInfo: {
      marginTop: '30px',
      lineHeight: '1.8',
      color: currentTheme.textColor
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        animation: 'fadeIn 0.3s ease'
      },
      modalContent: {
        background: currentTheme.cardBackground,
        borderRadius: '8px',
        maxWidth: '800px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '40px',
        position: 'relative',
        boxShadow: '0 5px 30px rgba(0,0,0,0.3)',
        animation: 'slideUp 0.4s ease',
        color: currentTheme.textColor
      },
      closeButton: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: 'none',
        border: 'none',
        fontSize: '1.8rem',
        cursor: 'pointer',
        color: currentTheme.textColor,
        transition: 'all 0.3s ease',
        ':hover': {
          color: currentTheme.buttonColor,
          transform: 'scale(1.1)'
        }
      },
      modalTitle: {
        color: currentTheme.buttonColor,
        marginBottom: '25px',
        paddingRight: '30px'
      },
      modalBody: {
        lineHeight: '1.8'
      },
      productImageGallery: {
        display: 'flex',
        gap: '20px',
        overflowX: 'auto',
        paddingBottom: '20px',
        marginBottom: '25px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#d32f2f #f5f5f5',
        '::-webkit-scrollbar': {
          height: '8px'
        },
        '::-webkit-scrollbar-track': {
          background: '#f5f5f5'
        },
        '::-webkit-scrollbar-thumb': {
          background: '#d32f2f',
          borderRadius: '4px'
        }
      },
      modalProductImage: {
        maxHeight: '300px',
        maxWidth: '100%',
        objectFit: 'contain',
        borderRadius: '4px',
        boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
      },
      featureList: {
        paddingLeft: '20px',
        margin: '20px 0',
        color: currentTheme.textColor
      },
      '@media (max-width: 1024px)': {
        section: {
          padding: '80px 20px'
        },
        mainHeading: {
          fontSize: '2.5rem'
        },
        subHeading: {
          fontSize: '2rem'
        },
        sectionTitle: {
          fontSize: '2.2rem'
        }
      },
      '@media (max-width: 768px)': {
        mainHeading: {
          fontSize: '2.2rem'
        },
        subHeading: {
          fontSize: '1.8rem'
        },
        sectionTitle: {
          fontSize: '2rem'
        },
        aboutContainer: {
          flexDirection: 'column-reverse'
        },
        aboutContent: {
          minWidth: '100%'
        },
        servicesGrid: {
          gridTemplateColumns: '1fr'
        },
        productsGrid: {
          gridTemplateColumns: '1fr'
        },
        industriesGrid: {
          gridTemplateColumns: 'repeat(2, 1fr)'
        },
        contactContainer: {
          flexDirection: 'column'
        },
        mapContainer: {
          height: '350px'
        }
      },
      '@media (max-width: 480px)': {
        mainHeading: {
          fontSize: '1.8rem'
        },
        subHeading: {
          fontSize: '1.5rem'
        },
        sectionTitle: {
          fontSize: '1.8rem'
        },
        industriesGrid: {
          gridTemplateColumns: '1fr'
        },
        modalContent: {
          padding: '30px 20px'
        }
      },
      '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      '@keyframes slideUp': {
        from: { 
          opacity: 0,
          transform: 'translateY(20px)'
        },
        to: { 
          opacity: 1,
          transform: 'translateY(0)'
        }
      }
  };

  return (
    <div style={styles.container}>
      {/* Dark/Light Mode Toggle */}
      <button 
        style={styles.themeToggleButton}
        onClick={toggleDarkMode}
      >
        {darkMode ? <FiSun /> : <FiMoon />}
      </button>

      {/* Welcome Section */}
      <WelcomeSection></WelcomeSection>

      {/* About Section */}
      <section id="about" style={{ ...styles.section, backgroundColor: currentTheme.sectionBackground }}>
      <h2 style={styles.sectionTitle}>Who We Are</h2>
        <div style={styles.aboutContainer}>
          <div style={styles.aboutContent}>
            <p>
              Shakti Electrotech is a leading electronics and automation technology company with over 18 years of experience in delivering state-of-the-art solutions for industrial automation, control systems, and electronic testing equipment.
            </p>
            <p>
              We have successfully partnered with industries including manufacturing, automotive, pharmaceuticals, food processing, and power generation, providing tailored automation solutions that improve efficiency, reliability, and operational safety.
            </p>
            <div style={styles.missionBox}>
              <h3>Our Mission</h3>
              <p>To provide innovative, high-quality, and cost-effective automation solutions that enhance industrial productivity while maintaining the highest standards of operational safety.</p>
              <p>We are committed to delivering customized solutions that precisely meet our clients' requirements, using only the best-in-class components and technologies.</p>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
            <img 
              src={shaktiLogo} 
              alt="Shakti Electrotech Logo" 
              style={styles.aboutLogo} 
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" style={{ ...styles.section, backgroundColor: currentTheme.sectionBackground }}>
      <h2 style={styles.sectionTitle}>Our Products</h2>
        <div style={styles.productsGrid}>
          {products.map((product, index) => (
             <ProductCard product={product}></ProductCard>
          ))}
        <ExploreMoreButton onclick={()=>handleNavigateToProduct()}></ExploreMoreButton>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" style={{ ...styles.section, backgroundColor: currentTheme.backgroundColor }}>
      <h2 style={styles.sectionTitle}>Industries We Serve</h2>
        <div style={styles.industriesGrid}>
          {industries.map((industry, index) => (
            <IndustriesCard imageSrc={industry.icon} heading={industry.name} subheading={industry.description} ></IndustriesCard>
          ))}
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" style={{ ...styles.section, backgroundColor: currentTheme.sectionBackground }}>
      <h2 style={styles.sectionTitle}>Our Clients</h2>
        <div style={styles.clientCarousel}>
          {clients.map((client, index) => (
            <div 
              key={index}
              style={styles.clientCard}
              onClick={() => openModal({
                type: 'client',
                title: client.name,
                content: (
                  <>
                    <h3 style={{ color: currentTheme.buttonColor, marginBottom: '10px' }}>{client.location}</h3>
                    <p style={{ fontStyle: 'italic', fontSize: '1.1rem' }}>
                      "{client.testimonial}"
                    </p>
                  </>
                )
              })}
            >
              <h3 style={{ color: currentTheme.buttonColor }}>{client.name}</h3>
              <p>{client.location}</p>
              <div style={styles.readTestimonial}>Read Testimonial →</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section with Updated Form */}
      <section id="contact" style={{ ...styles.section, backgroundColor: currentTheme.backgroundColor }}>
        <h2 style={styles.sectionTitle}>Contact Us</h2>
        <div style={styles.contactContainer}>
          <div style={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.223651109616!2d75.3525344!3d19.9138281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdbbd004cf63d99%3A0x7a1e0f36898e91af!2sShakti%20Electrotech!5e0!3m2!1sen!2sin!4v1711800000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </div>
          <div style={styles.formContainer}>
            {submitted ? (
              <div style={{ 
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                Thank you for your message! We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  style={styles.formInput}
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  style={styles.formInput}
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Your Phone" 
                  style={styles.formInput}
                  value={formData.phone}
                  onChange={handleFormChange}
                />
                <textarea 
                  name="message"
                  placeholder="Your Message" 
                  style={styles.formTextarea}
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                ></textarea>
                {error && <div style={{ 
                  color: '#f44336',
                  marginBottom: '15px',
                  textAlign: 'center'
                }}>{error}</div>}
                <button 
                  type="submit" 
                  style={styles.submitButton}
                >
                  Send Message
                </button>
              </form>
            )}
            <div style={styles.contactInfo}>
              <p><strong>Address:</strong> "Shakti" Plot No.73, Auditor Housing Society, Jalgaon Road, Chh. Sambhajinagar, 431003</p>
              <p><strong>Phone:</strong> Shankar Kinge - 9822315028, Gajanan Narkhede - 9881391966, Kaushal Kinge - 8055560185</p>
              <p><strong>Email:</strong> shaktietech@gmail.com</p>
              <p><strong>Working Hours:</strong> Mon-Sat: 9:30 AM - 6:30 PM</p>
            </div>
          </div>
        </div>
      </section>


      {/* Modal Component */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closeModal}>×</button>
            <h2 style={styles.modalTitle}>{modalContent.title}</h2>
            <div style={styles.modalBody}>
              {modalContent.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;