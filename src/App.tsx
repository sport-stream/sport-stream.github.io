import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home3 } from "./routes/Home3";
import { Home2 } from "./routes/Home2";
import { Home } from "./routes/Home";

import { Navbar } from "./Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home2 />} />
        <Route path="/careers" element={<Home3 />} />
      </Routes>
    </>
  );
}
export default App;
