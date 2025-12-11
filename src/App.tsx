import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Navbar from "./components/Navbar";
import AvatarGuide from "./components/AvatarGuide";
import SystemHUD from "./components/SystemHUD";
import SystemBoot from "./components/SystemBoot";
import CommandPalette from "./components/CommandPalette";

// Pages
import Home from "./pages/Home";
import SkillDetail from "./pages/SkillDetail";

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
    transition={{ duration: 0.5, ease: "anticipate" }}
    className="w-full"
  >
    {children}
  </motion.div>
);

// Wrapper to handle location-based effects
function Content() {
    const location = useLocation();
    
    return (
        <div className="bg-background text-foreground min-h-screen font-sans antialiased selection:bg-primary/30 selection:text-white cursor-none">
            <SystemHUD />
            <Navbar />
            <CommandPalette />
            
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                    <Route path="/skill/:skillId" element={<PageWrapper><SkillDetail /></PageWrapper>} />
                </Routes>
            </AnimatePresence>
            
            {/* Show Avatar Guide only on Home */}
            {location.pathname === "/" && <AvatarGuide />}
        </div>
    );
}

function App() {
  const [booted, setBooted] = useState(false);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {!booted && <SystemBoot onComplete={() => setBooted(true)} />}
      </AnimatePresence>
      
      {booted && <Content />}
    </BrowserRouter>
  );
}

export default App;