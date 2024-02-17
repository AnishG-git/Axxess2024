import "./styles/App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={Homepage} />
      </Routes>

      {/* Add more routes as needed */}
    </Router>
  );
}

export default App;
