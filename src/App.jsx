import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TzhaarPage from "./pages/tzhaar/TzhaarPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <Navbar />
        <main className="max-w-5xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tzhaar" element={<TzhaarPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
