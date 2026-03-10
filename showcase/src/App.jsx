import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import HeroSection from './components/HeroSection.jsx'
import OverviewSection from './components/OverviewSection.jsx'
import ArchitectureSection from './components/ArchitectureSection.jsx'
import CommandsSection from './components/CommandsSection.jsx'
import LiveDemoSection from './components/LiveDemoSection.jsx'
import InstallSection from './components/InstallSection.jsx'
import Footer from './components/Footer.jsx'
import ParticleField from './components/ParticleField.jsx'

import OfflineFirstPage from './pages/OfflineFirstPage.jsx'
import AsyncArchitecturePage from './pages/AsyncArchitecturePage.jsx'
import MAVLinkPage from './pages/MAVLinkPage.jsx'
import SITLPage from './pages/SITLPage.jsx'
import TeamSection from './components/TeamSection.jsx'

function HomePage() {
    return (
        <>
            <ParticleField />
            <Navbar />
            <main>
                <HeroSection />
                <OverviewSection />
                <ArchitectureSection />
                <CommandsSection />
                <LiveDemoSection />
                <InstallSection />
                <TeamSection />
            </main>
            <Footer />
        </>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/topic/offline-first" element={<OfflineFirstPage />} />
                <Route path="/topic/async-architecture" element={<AsyncArchitecturePage />} />
                <Route path="/topic/mavlink-protocol" element={<MAVLinkPage />} />
                <Route path="/topic/sitl-ready" element={<SITLPage />} />
                {/* Fallback — redirect unknown routes to home */}
                <Route path="*" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}
