import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainComponent from "./components/ui/MainComponent";
import ProductViewComponent from "./components/ui/ProductViewComponent";
import CartComponent from "./components/ui/CartComponent";
import LandingPage from "./components/ui/LandingPage";
import LoginPage from "./components/ui/LoginPage";
import RegisterPage from "./components/ui/RegisterPage";
import Navbar from "./components/ui/Navbar";
import ProductCard from "./components/ui/Myorders";
import ProductCard2 from "./components/ui/Wishlist";
import MainPage from "./components/ui/main_page";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/myorders" element={<ProductCard />} />
          <Route path="/sellermain" element={<MainPage />} />
          <Route path="/mywishlist" element={<ProductCard2 />} />
          <Route path="/maincomponent" element={<MainComponent />} />
          <Route
            path="/ProductViewComponent"
            element={<ProductViewComponent />}
          />
          <Route path="/CartComponent" element={<CartComponent />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/orders" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
