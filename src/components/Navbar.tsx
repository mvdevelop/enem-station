
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaUserCircle, FaBook, FaChartLine, FaEnvelope } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";
import { setUser } from "../store/authSlice";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    await supabase.auth.signOut();
    dispatch(setUser(null));
    navigate("/login");
  }

  // Verifica se o link está ativo
  const isActive = (path: string) => location.pathname === path;

  // Classe para animação de hover
  const linkClass = (path: string) => 
    `relative group transition text-white font-medium cursor-pointer ${
      isActive(path) ? 'text-blue-400' : ''
    }`;

  const underlineClass =
    "absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full";

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimages%2Fbook-icon-png-18.png&f=1&nofb=1"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold">Enem Station</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">

            {/* Links com underline animado */}
            <Link to="/" className={linkClass('/')}>
              Home
              <span className={underlineClass}></span>
            </Link>

            <Link to="/conteudo" className={linkClass('/conteudo')}>
              <div className="flex items-center gap-2">
                <FaBook size={14} />
                Conteúdo
              </div>
              <span className={underlineClass}></span>
            </Link>

            <Link to="/stats" className={linkClass('/stats')}>
              <div className="flex items-center gap-2">
                <FaChartLine size={14} />
                Stats
              </div>
              <span className={underlineClass}></span>
            </Link>

            <Link to="/contato" className={linkClass('/contato')}>
              <div className="flex items-center gap-2">
                <FaEnvelope size={14} />
                Contato
              </div>
              <span className={underlineClass}></span>
            </Link>

            {/* Search */}
            <div className="relative flex items-center">
              <FaSearch className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar conteúdo..."
                className="pl-10 pr-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 transition-all duration-200"
              />
            </div>

            {/* Área de usuário */}
            {!user ? (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium flex items-center gap-2 hover:scale-105 active:scale-95 duration-200"
              >
                <FaUserCircle size={20} />
                Login / Signup
              </Link>
            ) : (
              <div className="flex items-center gap-6">

                {/* Dropdown do usuário */}
                <div className="relative group">
                  <button className="flex items-center gap-2 hover:text-blue-400 transition">
                    <FaUserCircle size={20} />
                    <span className="max-w-[120px] truncate">{user.email}</span>
                    <svg 
                      className="w-4 h-4 transition-transform group-hover:rotate-180" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-2">
                      <div className="px-3 py-2 text-sm text-gray-300 border-b border-gray-700">
                        <div className="font-medium">{user.email}</div>
                      </div>
                      <Link 
                        to="/perfil" 
                        className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded transition"
                      >
                        Meu Perfil
                      </Link>
                      <Link 
                        to="/configuracoes" 
                        className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded transition"
                      >
                        Configurações
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 rounded transition mt-1"
                      >
                        Sair da conta
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden focus:outline-none hover:text-blue-400 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-7 h-7 transition-transform ${isOpen ? 'rotate-90' : ''}`}
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 flex flex-col gap-3 border-t border-gray-700 animate-fadeIn">
          
          <Link 
            to="/" 
            className={`py-3 px-2 ${isActive('/') ? 'text-blue-400 bg-blue-900/20' : ''} rounded-lg transition`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          <Link 
            to="/conteudo" 
            className={`py-3 px-2 flex items-center gap-2 ${isActive('/conteudo') ? 'text-blue-400 bg-blue-900/20' : ''} rounded-lg transition`}
            onClick={() => setIsOpen(false)}
          >
            <FaBook size={14} />
            Conteúdo
          </Link>

          <Link 
            to="/stats" 
            className={`py-3 px-2 flex items-center gap-2 ${isActive('/stats') ? 'text-blue-400 bg-blue-900/20' : ''} rounded-lg transition`}
            onClick={() => setIsOpen(false)}
          >
            <FaChartLine size={14} />
            Stats
          </Link>

          <Link 
            to="/contato" 
            className={`py-3 px-2 flex items-center gap-2 ${isActive('/contato') ? 'text-blue-400 bg-blue-900/20' : ''} rounded-lg transition`}
            onClick={() => setIsOpen(false)}
          >
            <FaEnvelope size={14} />
            Contato
          </Link>

          {/* Search Mobile */}
          <div className="relative flex items-center my-2">
            <FaSearch className="absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-3 py-2 w-full rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* User area mobile */}
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium text-center flex items-center justify-center gap-2 mt-2"
              onClick={() => setIsOpen(false)}
            >
              <FaUserCircle size={20} />
              Login / Signup
            </Link>
          ) : (
            <div className="flex flex-col gap-3 mt-2">
              <div className="px-2 py-2 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <FaUserCircle size={16} /> 
                  <span className="truncate">{user.email}</span>
                </div>
              </div>

              <Link 
                to="/perfil" 
                className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg transition"
                onClick={() => setIsOpen(false)}
              >
                Meu Perfil
              </Link>
              
              <Link 
                to="/configuracoes" 
                className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg transition"
                onClick={() => setIsOpen(false)}
              >
                Configurações
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm"
              >
                Sair da conta
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
