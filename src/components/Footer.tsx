
import { Link } from "react-router-dom";
import { FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Área 1 — Nome do site */}
        <div>
          <h2 className="text-xl font-bold text-white">Enem Station</h2>
          <p className="mt-3 text-sm">
            Plataforma de estudos focada no ENEM com conteúdo, estatísticas e muito mais.
          </p>
        </div>

        {/* Área 2 — Links úteis */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white transition">Home</Link>
            </li>
            <li>
              <Link to="/conteudo" className="hover:text-white transition">Conteúdo</Link>
            </li>
            <li>
              <Link to="/estatisticas" className="hover:text-white transition">Estatísticas</Link>
            </li>
            <li>
              <Link to="/contato" className="hover:text-white transition">Contato</Link>
            </li>
          </ul>
        </div>

        {/* Área 3 — Redes sociais */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Social</h3>
          <div className="flex space-x-5 text-2xl">
            <a href="#" target="_blank" className="hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" className="hover:text-white transition">
              <FaGithub />
            </a>
            <a href="mailto:contato@enemstation.com" className="hover:text-white transition">
              <FaEnvelope />
            </a>
          </div>
        </div>

      </div>

      {/* Linha inferior */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-5">
        © {new Date().getFullYear()} Enem Station — Todos os direitos reservados.
      </div>
    </footer>
  );
}

