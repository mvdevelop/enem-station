
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { supabase } from "./lib/supabaseClient";
import { setUser } from "./store/authSlice";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  // 🔥 Recupera a sessão atual do Supabase e salva no Redux
  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        dispatch(setUser(data.session.user));
      }
    }

    loadSession();

    // 🔥 Listener para login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(setUser(session?.user || null));
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <Routes>
        {/* 🔐 Rota protegida: só acessa se estiver logado */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />

        {/* Página de login/signup */}
        <Route
          path="/login"
          element={!user ? <LoginSignup /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}
