
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { supabase } from "./lib/supabaseClient";
import { setUser } from "./store/authSlice";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import Conteudo from "./pages/Conteudo";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        dispatch(setUser(data.session.user));
      }
    }

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(setUser(session?.user || null));
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [dispatch]);

  const Protected = ({ children }: { children: JSX.Element }) =>
    user ? children : <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {user && <Navbar />}

      {/* 🔥 Agora NÃO TEM MAIS SIDEBAR AQUI */}
      <main className="flex-1 p-4 md:p-8">
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />

          <Route
            path="/conteudo/:materia/:topico"
            element={
              <Protected>
                <Conteudo />
              </Protected>
            }
          />

          <Route
            path="/login"
            element={!user ? <LoginSignup /> : <Navigate to="/" replace />}
          />
        </Routes>
      </main>

      {user && <Footer />}
    </div>
  );
}
