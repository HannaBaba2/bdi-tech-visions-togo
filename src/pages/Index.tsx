
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Projects from '@/components/Projects';
import Team from '@/components/Team';
import Publications from '@/components/Publications';
import Partners from '@/components/Partners';
import Donation from '@/components/Donation';
import Footer from '@/components/Footer';


const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Mission />
      <Projects />
      <Team />
      <Publications />
      <Partners />
      <Donation />
      <Footer />
      
    </div>
  );
};

export default Index;
