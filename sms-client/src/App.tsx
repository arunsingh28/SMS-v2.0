import React from "react";
import Contact from "./pages/Contact_us";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Contact />
    </Router>
  );
}

export default App;
