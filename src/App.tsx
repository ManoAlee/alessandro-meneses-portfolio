import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components
import Navbar from "./components/Navbar";
import AvatarGuide from "./components/AvatarGuide";
import SystemHUD from "./components/SystemHUD";
import SystemBoot from "./components/SystemBoot";
import CommandPalette from "./components/CommandPalette";

// Pages
import Home from "./pages/Home";
import SkillDetail from "./pages/SkillDetail";

// Wrapper to handle location-based effects
function Content() {
    const location = useLocation();
    
    return (
        <div className="bg-background text-foreground min-h-screen font-sans antialiased selection:bg-primary/30 selection:text-white cursor-none">
            <SystemHUD />
            <Navbar />
            <CommandPalette />
            
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/skill/:skillId" element={<SkillDetail />} />
            </Routes>
            
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