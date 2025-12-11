import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/30">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
