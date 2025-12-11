
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMail, FiLock, FiUserPlus, FiLogIn } from "react-icons/fi";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      let authResult;

      if (isLogin) {
        authResult = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      } else {
        authResult = await supabase.auth.signUp({
          email,
          password,
        });
      }

      if (authResult.error) throw authResult.error;

      dispatch(setUser(authResult.data.user));
      toast.success(isLogin ? "Login realizado!" : "Conta criada!");

      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Ocorreu um erro inesperado.");
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <ToastContainer />

      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Entrar" : "Criar Conta"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <div className="flex items-center gap-2 bg-gray-700 p-3 rounded-xl">
              <FiMail />
              <input
                type="email"
                className="bg-transparent w-full outline-none"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Senha</label>
            <div className="flex items-center gap-2 bg-gray-700 p-3 rounded-xl">
              <FiLock />
              <input
                type="password"
                className="bg-transparent w-full outline-none"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            {isLogin ? (
              <>
                <FiLogIn /> Entrar
              </>
            ) : (
              <>
                <FiUserPlus /> Criar Conta
              </>
            )}
          </button>
        </form>

        <p
          className="text-center mt-4 cursor-pointer hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Não tem conta? Criar conta" : "Já possui conta? Entrar"}
        </p>
      </div>
    </div>
  );
}
