import React from 'react';
import styled, { keyframes } from 'styled-components';

// Float animation
const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Gradient border via pseudo-element (optional enhancement)
const gradientBorder = `
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  z-index: -1;
  border-radius: 25px;
  background: linear-gradient(45deg, #ff4d4d, #ff1a1a, #ff4d4d);
  filter: blur(5px);
`;

const Card = styled.div`
  width: 195px;
  height: 285px;
  background: #313131;
  border-radius: 20px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.04) rotate(-1deg);
  }

  &:hover img {
    height: 65%;
    filter: blur(7px) grayscale(100%);
    animation: ${float} 3s infinite;
  }

  &:hover div {
    opacity: 1;
  }

`;

const Img = styled.img`
  height: 30%;
  position: absolute;
  transition: 0.2s ease-in-out;
  z-index: 1;
`;

const TextBox = styled.div`
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  transition: 0.2s ease-in-out;
  z-index: 2;
`;

const Head = styled.p`
  font-weight: bold;
  font-size: 35px;
  color: white;
  border: 2px solid red;
  padding: 5px 10px;
  border-radius: 10px;
  text-shadow: 2px 2px 5px rgba(255, 0, 0, 0.8);
`;

const Price = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: white;
  border: 2px solid red;
  padding: 3px 8px;
  border-radius: 8px;
  text-shadow: 1px 1px 4px rgba(255, 0, 0, 0.7);
`;

// Main Component
const IndustriesCard = ({ imageSrc, heading, subheading }) => {
  return (
    <Card>
      <Img src={imageSrc} alt="Card Icon" />
      <TextBox>
        <Head>{heading}</Head>
        <Price>{subheading}</Price>
      </TextBox>
    </Card>
  );
};

export default IndustriesCard;
