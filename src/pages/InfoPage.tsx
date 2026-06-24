import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

interface InfoPageProps {
  title: string;
  description: string;
}

export const InfoPage: React.FC<InfoPageProps> = ({ title, description }) => {
  return (
    <>
      <Navbar />
      <main className="container" style={{ padding: '80px 0', minHeight: '60vh', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Playfair Display', fontSize: '48px', color: '#ae2d46', marginBottom: '16px' }}>
          {title}
        </h1>
        <p style={{ fontFamily: 'Inter', fontSize: '18px', color: '#584143', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          {description}
        </p>
      </main>
      
      <Footer />
      
      <CartDrawer />
    </>
  );
};
export default InfoPage;
