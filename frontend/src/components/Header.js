import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import ServiceButton from './ServiceButton'
import shaktiLogo from '../assets/shakti full logo trac.png';

function Header({ currentSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'welcome', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'industries', label: 'Industries' },
    { id: 'clients', label: 'Clients' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 2px 15px rgba(0, 0, 0, 0.08)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 5%',
      transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      ...(isScrolled && {
        padding: '10px 5%',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
        backgroundColor: 'rgba(255, 255, 255, 0.98)'
      }),
      ...(isMenuOpen && {
        backgroundColor: 'rgba(255, 255, 255, 1)'
      })
    }}>
      <div style={{
        flex: 1,
        transition: 'transform 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        <img 
          src={shaktiLogo} 
          alt="Shakti Electrotech Logo" 
          style={{
            height: '50px',
            width: 'auto',
            objectFit: 'contain',
            transition: 'transform 0.3s ease'
          }} 
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <span style={{
          fontSize: '1.2rem',
          fontWeight: '600',
          color: '#333',
          transition: 'color 0.3s ease'
        }}>Shakti Electrotech</span>
      </div>

    
      
      {/* Desktop Navigation */}
      <nav style={{
        display: 'flex',
        gap: '30px',
        alignItems: 'center',
        '@media (max-width: 768px)': {
          display: 'none'
        }
      }}>
        <ServiceButton>
        </ServiceButton>
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.id}
            spy={true}
            smooth={true}
            duration={500}
            style={{
              color: currentSection === item.id ? '#d32f2f' : '#333',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              padding: '8px 0',
              position: 'relative',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              overflow: 'hidden',
              display: 'inline-block',
              ':hover': {
                color: '#d32f2f'
              }
            }}
            onMouseEnter={(e) => {
              const hoverElement = e.currentTarget.querySelector('span');
              if (hoverElement) hoverElement.style.width = '100%';
            }}
            onMouseLeave={(e) => {
              const hoverElement = e.currentTarget.querySelector('span');
              if (hoverElement && currentSection !== item.id) hoverElement.style.width = '0%';
            }}
          >
            {item.label}
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: currentSection === item.id ? '100%' : '0%',
              height: '2px',
              backgroundColor: '#d32f2f',
              transition: 'width 0.3s ease',
              display: 'block'
            }}></span>
          </Link>
        ))}

        <a 
          href="/login" 
          style={{
            color: '#333',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem',
            padding: '10px 20px',
            position: 'relative',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            overflow: 'hidden',
            display: 'inline-block',
            borderRadius: '4px',
            border: '2px solid #d32f2f',
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            const hoverElement = e.currentTarget.querySelector('span:last-child');
            if (hoverElement) hoverElement.style.width = '100%';
            e.currentTarget.querySelector('span:first-child').style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            const hoverElement = e.currentTarget.querySelector('span:last-child');
            if (hoverElement) hoverElement.style.width = '0%';
            e.currentTarget.querySelector('span:first-child').style.color = '#333';
          }}
        >
          <span style={{
            position: 'relative',
            zIndex: 2,
            transition: 'color 0.3s ease'
          }}>Login</span>
          <span style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '0%',
            height: '100%',
            backgroundColor: '#d32f2f',
            transition: 'width 0.3s ease',
            zIndex: 1
          }}></span>
        </a>
      </nav>
      
      {/* Mobile Menu Button */}
      <button 
        style={{
          background: 'transparent',
          border: 'none',
          width: '40px',
          height: '40px',
          display: 'none',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '0',
          transition: 'all 0.3s ease',
          '@media (max-width: 768px)': {
            display: 'flex'
          },
          ':hover': {
            opacity: 0.8
          },
          transform: isMenuOpen ? 'rotate(90deg)' : 'none'
        }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span style={{
          width: '25px',
          height: '2px',
          backgroundColor: '#333',
          margin: '3px 0',
          transition: 'all 0.3s ease',
          transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
        }}></span>
        <span style={{
          width: '25px',
          height: '2px',
          backgroundColor: '#333',
          margin: '3px 0',
          transition: 'all 0.3s ease',
          opacity: isMenuOpen ? 0 : 1
        }}></span>
        <span style={{
          width: '25px',
          height: '2px',
          backgroundColor: '#333',
          margin: '3px 0',
          transition: 'all 0.3s ease',
          transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
        }}></span>
      </button>
      
      {/* Mobile Navigation */}
      <nav style={{
        position: 'fixed',
        top: '80px',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        padding: isMenuOpen ? '20px 5%' : '0 5%',
        gap: '10px',
        zIndex: 999,
        maxHeight: isMenuOpen ? '500px' : '0',
        overflow: 'hidden',
        transition: 'all 0.4s ease',
        opacity: isMenuOpen ? 1 : 0,
        visibility: isMenuOpen ? 'visible' : 'hidden'
      }}>
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.id}
            spy={true}
            smooth={true}
            duration={500}
            style={{
              color: currentSection === item.id ? '#d32f2f' : '#333',
              textDecoration: 'none',
              fontWeight: currentSection === item.id ? '600' : '500',
              fontSize: '1.1rem',
              padding: '12px 15px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: currentSection === item.id ? 'rgba(211, 47, 47, 0.08)' : 'transparent',
              paddingLeft: currentSection === item.id ? '20px' : '15px',
              ':before': {
                content: '""',
                position: 'absolute',
                left: currentSection === item.id ? '10px' : '-10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '5px',
                height: '5px',
                backgroundColor: currentSection === item.id ? '#d32f2f' : 'transparent',
                borderRadius: '50%',
                transition: 'all 0.3s ease'
              }
            }}
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#d32f2f';
              e.currentTarget.style.backgroundColor = 'rgba(211, 47, 47, 0.05)';
              e.currentTarget.style.paddingLeft = '20px';
              e.currentTarget.style.before.left = '10px';
              e.currentTarget.style.before.backgroundColor = '#d32f2f';
            }}
            onMouseLeave={(e) => {
              if (currentSection !== item.id) {
                e.currentTarget.style.color = '#333';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.paddingLeft = '15px';
                e.currentTarget.style.before.left = '-10px';
                e.currentTarget.style.before.backgroundColor = 'transparent';
              }
            }}
          >
            {item.label}
          </Link>
        ))}
        
        <a 
          href="/login" 
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '1.1rem',
            padding: '12px 15px',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            borderRadius: '4px',
            backgroundColor: '#d32f2f',
            textAlign: 'center',
            marginTop: '10px'
          }}
          onClick={() => setIsMenuOpen(false)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#b71c1c';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#d32f2f';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Login
        </a>
      </nav>
    </header>
  );
}

export default Header;