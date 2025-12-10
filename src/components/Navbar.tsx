
import { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo + Nome */}
          <div className="flex items-center gap-2">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimages%2Fbook-icon-png-18.png&f=1&nofb=1&ipt=92c79cbaa2444c795354de011bced96a12a12b972c2a5000c778c316c27f39dd"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold">Enem Station</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="hover:text-blue-400 transition">Home</a>
            <a href="#" className="hover:text-blue-400 transition">Conteúdo</a>
            <a href="#" className="hover:text-blue-400 transition">Stats</a>
            <a href="#" className="hover:text-blue-400 transition">Contato</a>

            {/* Search Bar */}
            <div className="relative flex items-center">
              <FaSearch className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-3 py-1 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Login / Signup Button */}
            <a
              href="/loginsignup"
              className="px-4 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium flex items-center gap-2"
            >
              <FaUserCircle size={20} />
              Login / Signup
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 flex flex-col gap-3">
          <a href="#" className="hover:text-blue-400 transition">Home</a>
          <a href="#" className="hover:text-blue-400 transition">Conteúdo</a>
          <a href="#" className="hover:text-blue-400 transition">Stats</a>
          <a href="#" className="hover:text-blue-400 transition">Contato</a>

          {/* Mobile Search */}
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-3 py-1 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <a
            href="/loginsignup"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium text-center flex items-center justify-center gap-2"
          >
            <FaUserCircle size={20} />
            Login / Signup
          </a>
        </div>
      )}
    </nav>
  );
}
