import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import Essay from "./pages/Essay";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/project" element={<Project />} />
            <Route path="/essay" element={<Essay />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
