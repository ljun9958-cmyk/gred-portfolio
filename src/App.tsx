/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import REITsProject from './pages/REITsProject';
import CityVibeProject from './pages/CityVibeProject';
import About from './pages/About';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reits" element={<REITsProject />} />
          <Route path="/cityvibe" element={<CityVibeProject />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
}

