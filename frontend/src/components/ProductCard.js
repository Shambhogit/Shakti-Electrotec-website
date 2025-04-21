import React from "react";
import styled from "styled-components";

const Card = styled.div`
  position: relative;
  max-width: 350px;
  background: linear-gradient(to bottom, #c3e6ec, #a7d1d9);
  border-radius: 12px;
  padding: 1.5em;
  margin: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;

  &:hover {
    transform: translateY(-16px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2);
  }

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: linear-gradient(135deg, #364a60, #384c6c);
    height: 32px;
    width: 32px;
    border-radius: 50%;
    transform: scale(1);
    transition: transform 0.4s ease;
  }

  &:hover:before {
    transform: scale(28);
  }

  &:hover h2,
  &:hover p {
    color: white;
  }
`;

const Gallery = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  margin-bottom: 1em;

  /* Hide vertical scrollbar */
  overflow-y: hidden;
  
  &::-webkit-scrollbar {
    height: 8px;
    width: 8px; /* For vertical scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  padding:10px;
  object-fit: cover;
  border-radius: 20px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    transform: scale(1.1);
  }
`;

const Name = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  color: #262626;
  margin: 0.5em 0;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #452c2c;
`;

const ProductCard = ({ product }) => {
  return (
    <Card>
      <Gallery>
        {product.links.map((src, index) => (
          <Image key={index} src={src} alt={product.name} />
        ))}
      </Gallery>
      <Name>{product.name}</Name>
      <Description>{product.description}</Description>
    </Card>
  );
};

export default ProductCard;
