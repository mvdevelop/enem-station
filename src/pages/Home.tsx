
import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { 
  FaChartBar, 
  FaEnvelope, 
  FaBook, 
  FaBookOpen, 
  FaCalculator, 
  FaFlask, 
  FaAtom, 
  FaDna, 
  FaGlobeAmericas, 
  FaMapMarkerAlt,
  FaLanguage,
  FaGraduationCap,
  FaRocket,
  FaAward,
  FaLightbulb,
  FaCalendarAlt
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Dados das matérias com ícones e cores específicas
const SUBJECTS = [
  {
    id: "linguagens",
    name: "Linguagens",
    icon: <FaLanguage className="text-blue-500" size={24} />,
    img: "https://source.unsplash.com/800x600/?books,library",
    desc: "Português, Literatura, Artes e Língua Estrangeira. Domine a interpretação textual.",
    color: "from-blue-600 to-blue-400",
    borderColor: "border-blue-500",
    topics: 35
  },
  {
    id: "matematica",
    name: "Matemática",
    icon: <FaCalculator className="text-green-500" size={24} />,
    img: "https://source.unsplash.com/800x600/?mathematics,numbers",
    desc: "Álgebra, Geometria, Estatística e Matemática Financeira. Raciocínio lógico na prática.",
    color: "from-green-600 to-green-400",
    borderColor: "border-green-500",
    topics: 42
  },
  {
    id: "fisica",
    name: "Física",
    icon: <FaAtom className="text-purple-500" size={24} />,
    img: "https://source.unsplash.com/800x600/?physics,science",
    desc: "Mecânica, Termodinâmica, Eletricidade e Ondulatória. Conceitos aplicados.",
    color: "from-purple-600 to-purple-400",
    borderColor: "border-purple-500",
    topics: 28
  },
  {
    id: "quimica",
    name: "Química",
    icon: <FaFlask className="text-red-500" size={24} />,
    img: "https://source.unsplash.com/800x600/?chemistry,laboratory",
    desc: "Orgânica, Inorgânica, Físico-Química. Reações e cálculos químicos.",
    color: "from-red-600 to-red-400",
    borderColor: "border-red-500",
    topics: 32
  },
  {
    id: "biologia",
    name: "Biologia",
    icon: <FaDna className="text-teal-500" size={24} />,
    img: "https://source.unsplash.com/800x600/?biology,cell",
    desc: "Genética, Ecologia, Fisiologia. Compreenda os seres vivos e o meio ambiente.",
    color: "from-teal-600 to-teal-400",
    borderColor: "border-teal-500",
    topics: 36
  },
  {
    id: "historia",
    name: "História",
    icon: <FaGlobeAmericas className="text-amber-500" size={24} />,
    img: "https://source.unsplash.com/800x600/?history,ancient",
    desc: "Brasil e Geral. Análise de fatos históricos e contexto social.",
    color: "from-amber-600 to-amber-400",
    borderColor: "border-amber-500",
    topics: 30
  },
  {
    id: "geografia",
    name: "Geografia",
    icon: <FaMapMarkerAlt className="text-indigo-500" size={24} />,
    img: "https://source.unsplash.com/800x600/?geography,earth",
    desc: "Física e Humana. Entenda o espaço geográfico e relações sociais.",
    color: "from-indigo-600 to-indigo-400",
    borderColor: "border-indigo-500",
    topics: 31
  },
  {
    id: "redacao",
    name: "Redação",
    icon: <FaBookOpen className="text-pink-500" size={24} />,
    img: "https://source.unsplash.com/800x600/?writing,notebook",
    desc: "Estrutura, argumentação e proposta de intervenção. Alcance os 1000 pontos!",
    color: "from-pink-600 to-pink-400",
    borderColor: "border-pink-500",
    topics: 15
  },
];

// Estatísticas e números
const STATS = [
  { number: "4", label: "Áreas do Conhecimento", icon: "📚" },
  { number: "13", label: "Matérias Completas", icon: "📖" },
  { number: "72+", label: "Subtópicos Detalhados", icon: "📝" },
  { number: "1000", label: "Pontos na Redação", icon: "🏆" },
];

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* =======================================================
          HERO SECTION COM GRADIENTE
      ======================================================== */}
      <section
        className="relative h-[60vh] sm:h-[70vh] md:h-[75vh] overflow-hidden bg-gradient-to-br from-blue-900/80 via-gray-900 to-purple-900/80"
        aria-label="Banner Enem Station"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90"></div>
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070"
            alt="Banner Enem Station"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 text-center">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-blue-600/20 backdrop-blur-sm rounded-full border border-blue-500/30">
              <FaRocket className="text-blue-400" />
              <span className="text-sm text-blue-300">Plataforma de Estudos</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ENEM Station
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Prepare-se para o ENEM com conteúdo organizado, exercícios práticos 
              e acompanhamento completo do seu progresso. Tudo gratuito.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/conteudo"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-900/30"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FaBookOpen />
                  Explorar Conteúdo Completo
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
              </Link>

              <Link
                to="/stats"
                className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:bg-gray-800/70 hover:border-gray-600 transition-all duration-300 transform hover:scale-105"
              >
                <FaChartBar />
                Ver Meu Progresso
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* =======================================================
          ESTATÍSTICAS
      ======================================================== */}
      <section className="py-12 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Tudo o que você precisa em um só lugar
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Conteúdo completo, organizado e atualizado conforme a matriz do ENEM
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, index) => (
              <div 
                key={index} 
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-gray-600 hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================================================
          MATÉRIAS EM DESTAQUE
      ======================================================== */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Matérias do ENEM
                </span>
              </h2>
              <p className="text-gray-400">
                Explore todo o conteúdo organizado por áreas do conhecimento
              </p>
            </div>
            
            <Link
              to="/conteudo"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-300 group"
            >
              <span>Ver todas as matérias</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.25 },
              768: { slidesPerView: 2.25 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="pb-12"
          >
            {SUBJECTS.map((subject) => (
              <SwiperSlide key={subject.id}>
                <Link to="/conteudo" className="block h-full">
                  <article className={`group h-full bg-gradient-to-br ${subject.color} border ${subject.borderColor}/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300`}>
                    {/* Imagem com overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                      <img
                        src={subject.img}
                        alt={subject.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Badge no canto */}
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                          {subject.topics} tópicos
                        </div>
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="p-6 relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                          {subject.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white">{subject.name}</h3>
                      </div>
                      
                      <p className="text-gray-200 mb-6 line-clamp-2">
                        {subject.desc}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">
                          Clique para explorar
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* =======================================================
          RECURSOS ESPECIAIS
      ======================================================== */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-gray-900 to-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Recursos Exclusivos
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Ferramentas desenvolvidas para potencializar seus estudos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 group hover:transform hover:scale-[1.02]">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <FaGraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Conteúdo Organizado</h3>
              <p className="text-gray-400 mb-6">
                Toda a matriz do ENEM estruturada em matérias e subtópicos, 
                com explicações claras e exercícios práticos.
              </p>
              <Link 
                to="/conteudo" 
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>Começar a estudar</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300 group hover:transform hover:scale-[1.02]">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-400 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <FaChartBar size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Acompanhamento</h3>
              <p className="text-gray-400 mb-6">
                Monitore seu progresso, identifique pontos fortes e áreas que 
                precisam de mais atenção com estatísticas detalhadas.
              </p>
              <Link 
                to="/stats" 
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
              >
                <span>Ver estatísticas</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 group hover:transform hover:scale-[1.02]">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <FaAward size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Redação Nota 1000</h3>
              <p className="text-gray-400 mb-6">
                Aprenda a estrutura ideal, domine as competências e pratique 
                com temas atuais para alcançar a nota máxima.
              </p>
              <Link 
                to="/conteudo" 
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <span>Aprender redação</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          CTA FINAL
      ======================================================== */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 rounded-3xl p-12 border border-gray-800">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full border border-blue-500/20">
              <FaLightbulb className="text-yellow-400" />
              <span className="text-sm text-yellow-300">Dica Importante</span>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-6">
              Comece sua preparação hoje mesmo!
            </h3>
            
            <p className="text-gray-300 mb-10 text-lg">
              O segredo do sucesso no ENEM está na consistência. 
              Estude um pouco todos os dias e acompanhe seu progresso.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/conteudo"
                className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FaBook />
                  Acessar Todo o Conteúdo
                </span>
              </Link>

              <Link
                to="/stats"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 text-lg font-semibold bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:bg-gray-800/70 hover:border-gray-600 transition-all duration-300 transform hover:scale-105"
              >
                <FaCalendarAlt />
                Planejar Estudos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
