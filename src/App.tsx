import { useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Navbar from "./components/Navbar";
import AvatarGuide from "./components/AvatarGuide";
import SystemHUD from "./components/SystemHUD";
import SystemBoot from "./components/SystemBoot";
import CommandPalette from "./components/CommandPalette";
import MatrixRain from "./components/MatrixRain";

// Context
import { GameProvider } from "./context/GameContext";
import { SystemContext } from "./context/SystemContext"; // NEW import

// Pages
import Home from "./pages/Home";
import SkillDetail from "./pages/SkillDetail";
import NotFound from "./pages/NotFound"; 
import Resume from "./pages/Resume"; // NEW
import { useEffect } from "react";

// (Removed inline SystemContext export)

// Scroll Restoration Helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
    transition={{ duration: 0.5, ease: "anticipate" }}
    className="w-full relative"
  >
    {children}
  </motion.div>
);

// Wrapper to handle location-based effects
function Content() {
    const location = useLocation();
    
    return (
        <div className="bg-background text-foreground min-h-screen font-sans antialiased selection:bg-primary/30 selection:text-white relative">
            <ScrollToTop /> {/* Handle Scroll */}
            <SystemHUD />
            <Navbar />
            <CommandPalette />
            
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                    <Route path="/skill/:skillId" element={<PageWrapper><SkillDetail /></PageWrapper>} />
                    <Route path="/cv" element={<Resume />} /> {/* NEW */}
                    <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} /> {/* Catch-all */}
                </Routes>
            </AnimatePresence>
            
            {/* Show Avatar Guide only on Home */}
            {location.pathname === "/" && <AvatarGuide />}
        </div>
    );
}

function App() {
  const [booted, setBooted] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  return (
    <GameProvider> 
        <SystemContext.Provider value={{ 
            matrixMode, 
            toggleMatrix: () => setMatrixMode(!matrixMode),
            isLowPower,
            toggleLowPower: () => setIsLowPower(!isLowPower)
        }}>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            {matrixMode && !isLowPower && <MatrixRain />}
            {/* Conditional Effects based on Power Mode would go here */}
            
            <AnimatePresence mode="wait">
                {!booted && <SystemBoot onComplete={() => setBooted(true)} />}
            </AnimatePresence>
            
            {booted && <Content />}
            </BrowserRouter>
        </SystemContext.Provider>
    </GameProvider>
  );
}

export default App;