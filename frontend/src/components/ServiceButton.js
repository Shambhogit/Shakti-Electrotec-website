import React from "react";
import "./ServiceButton.css"; // Optional if you want to extract styles
import ServiceCard from "./ServiceCard";


const ServicesButton = () => {
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
    }
  ];

  return (
    <div className="tooltip-container">
      <button aria-describedby="help-tooltip" className="help-button">
        Services
      </button>
      <div role="tooltip" id="help-tooltip" className="tooltip">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}

      </div>
    </div>
  );
};

export default ServicesButton;
