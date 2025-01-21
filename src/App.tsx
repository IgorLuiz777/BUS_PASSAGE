import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "@/components/header";
import { HomePage } from "@/pages/home";
import { SearchPage } from "@/pages/search";
import { SignInPage } from "@/pages/auth/sign-in";
import { SignUpPage } from "@/pages/auth/sign-up";
import { CheckoutPage } from "@/pages/checkout";
import { SuccessPage } from "@/pages/success";
import "./App.css";
import { TripDetailsPage } from "./pages/trip-details";
import { Footer } from "./components/footer";
import { OrdersPage } from "./pages/orders";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-background flex flex-col">
        <Routes>
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route
            path="/"
            element={
              <>
                <Header />
                <main className="w-full flex-1">
                  <HomePage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <Header />
                <main className="w-full flex-1">
                  <SearchPage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/trip/:id"
            element={
              <>
                <Header />
                <main className="w-full flex-1">
                  <TripDetailsPage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <main className="w-full flex-1">
                  <CheckoutPage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/success"
            element={
              <>
                <Header />
                <main className="w-full flex-1">
                  <SuccessPage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <main className="w-full flex-1">
                  <OrdersPage />
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
