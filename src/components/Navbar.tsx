
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";
import { setUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    dispatch(setUser(null));
    navigate("/login");
  }

  const linkClass =
    "relative group transition text-white font-medium cursor-pointer";
  const underlineClass =
    "absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full";

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimages%2Fbook-icon-png-18.png&f=1&nofb=1"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold">Enem Station</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className={linkClass}>
              Home
              <span className={underlineClass}></span>
            </a>

            <a href="#" className={linkClass}>
              Conteúdo
              <span className={underlineClass}></span>
            </a>

            <a href="#" className={linkClass}>
              Stats
              <span className={underlineClass}></span>
            </a>

            <a href="#" className={linkClass}>
              Contato
              <span className={underlineClass}></span>
            </a>

            {/* Search */}
            <div className="relative flex items-center">
              <FaSearch className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-3 py-1 rounded-lg bg-gray-800 border border-gray-700 
                           focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* User area */}
            {!user ? (
              <a
                href="/login"
                className="px-4 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium 
                           flex items-center gap-2 cursor-pointer"
              >
                <FaUserCircle size={20} />
                Login / Signup
              </a>
            ) : (
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                  <FaUserCircle size={20} />
                  {user.email}
                </span>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg transition 
                             cursor-pointer active:scale-95"
                >
                  Sair
                </button>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden focus:outline-none cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 flex flex-col gap-4">

          <a href="/" className={linkClass}>
            Home
            <span className={underlineClass}></span>
          </a>

          <a href="#" className={linkClass}>
            Conteúdo
            <span className={underlineClass}></span>
          </a>

          <a href="#" className={linkClass}>
            Stats
            <span className={underlineClass}></span>
          </a>

          <a href="#" className={linkClass}>
            Contato
            <span className={underlineClass}></span>
          </a>

          {/* Search */}
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-3 py-1 rounded-lg bg-gray-700 border border-gray-600 
                         focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* User Area */}
          {!user ? (
            <a
              href="/login"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition 
                         font-medium text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaUserCircle size={20} />
              Login / Signup
            </a>
          ) : (
            <div className="flex flex-col gap-3">
              <span className="flex items-center gap-2">
                <FaUserCircle size={20} /> {user.email}
              </span>

              {/* MOBILE logout with cursor-pointer */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition 
                           cursor-pointer active:scale-95"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
