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

export default function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-background">
        <Routes>
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route
            path="/"
            element={
              <>
                <Header />
                <main className="w-full">
                  <HomePage />
                </main>
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <Header />
                <main className="w-full">
                  <SearchPage />
                </main>
              </>
            }
          />
          <Route
            path="/trip/:id"
            element={
              <>
                <Header />
                <main className="w-full">
                  <TripDetailsPage />
                </main>
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <main className="w-full">
                  <CheckoutPage />
                </main>
              </>
            }
          />
          <Route
            path="/success"
            element={
              <>
                <Header />
                <main className="w-full">
                  <SuccessPage />
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
