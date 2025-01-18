import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "@/components/header";
import { HomePage } from "@/pages/home";
import { SearchPage } from "@/pages/search";
import { SignInPage } from "@/pages/auth/sign-in";
import { SignUpPage } from "@/pages/auth/sign-up";
import "./App.css";

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
        </Routes>
      </div>
    </Router>
  );
}