import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";
import Entry from "./pages/Entry";
import Register from "./pages/Register";
function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-left" />
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
