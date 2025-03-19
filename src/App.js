import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Essay from './pages/Essay';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/essay" element={<Essay />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
