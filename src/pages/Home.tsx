
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChartBar, FaEnvelope } from "react-icons/fa";

const SUBJECTS = [
  {
    id: "portugues",
    name: "Linguagens (Português)",
    img: "https://source.unsplash.com/800x600/?books,reading",
    desc: "Textos, interpretação e gramática — prática com questões comentadas.",
  },
  {
    id: "matematica",
    name: "Matemática",
    img: "https://source.unsplash.com/800x600/?mathematics,geometry",
    desc: "Raciocínio lógico e resolução de problemas com exercícios por tema.",
  },
  {
    id: "fisica",
    name: "Física",
    img: "https://source.unsplash.com/800x600/?physics,lab",
    desc: "Conceitos físicos aplicados em questões do Enem e simulados.",
  },
  {
    id: "quimica",
    name: "Química",
    img: "https://source.unsplash.com/800x600/?chemistry,lab",
    desc: "Química orgânica, inorgânica e práticas para o vestibular.",
  },
  {
    id: "biologia",
    name: "Biologia",
    img: "https://source.unsplash.com/800x600/?biology,nature",
    desc: "Genética, ecologia e citologia com mapas mentais e exercícios.",
  },
  {
    id: "historia",
    name: "História",
    img: "https://source.unsplash.com/800x600/?history,museum",
    desc: "Contexto histórico e análise de fontes para o Enem.",
  },
  {
    id: "geografia",
    name: "Geografia",
    img: "https://source.unsplash.com/800x600/?geography,map",
    desc: "Geopolítica, geografia física e humana focadas em provas do Enem.",
  },
  {
    id: "ingles",
    name: "Língua Estrangeira",
    img: "https://source.unsplash.com/800x600/?language,english",
    desc: "Interpretação de textos em inglês/espanhol e vocabulário útil.",
  },
];

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen bg-gray-900 text-white">

      {/* =======================================================
          BANNER
      ======================================================== */}
      <section
        className="relative h-[52vh] sm:h-[60vh] md:h-[68vh] lg:h-[72vh] overflow-hidden"
        aria-label="Banner Enem Station"
      >
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F200620.jpg&f=1&nofb=1&ipt=6ead9409a58dca2ce3d86fc2c5ebd67d5c6ff97996b85ba5c8d1d01f2aefdb5c"
          alt="Banner Enem Station"
          className="w-full h-full object-cover brightness-75"
        />

        <div className="absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-12 lg:px-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
            Enem Station
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-gray-200/90">
            Plataforma gratuita para estudantes do ensino público — aulas,
            simulados e estatísticas para maximizar sua preparação.
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              to="/conteudo"
              className="inline-block bg-blue-600 hover:bg-blue-500 transition px-5 py-3 rounded-md font-semibold shadow-md"
            >
              Ver Conteúdos
            </Link>

            <Link
              to="/stats"
              className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 transition px-4 py-3 rounded-md"
            >
              <FaChartBar />
              Estatísticas
            </Link>
          </div>
        </div>
      </section>

      {/* =======================================================
          MATÉRIAS — agora com FUNDO CINZA CLARO
      ======================================================== */}
      <section className="py-12 px-6 sm:px-12 lg:px-24 bg-[#f7f7f7] text-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Matérias</h2>
            <Link
              to="/conteudo"
              className="text-sm text-blue-600 hover:underline"
            >
              Ver todos os conteúdos →
            </Link>
          </div>

          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.25 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            className="py-4"
          >
            {SUBJECTS.map((s) => (
              <SwiperSlide key={s.id}>
                <Link to="/conteudo" className="block">
                  <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transition duration-200">
                    <div className="h-40 sm:h-44 md:h-52 overflow-hidden">
                      <img
                        src={s.img}
                        alt={s.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{s.name}</h3>
                      <p className="mt-2 text-sm text-gray-700">{s.desc}</p>
                    </div>
                  </article>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* =======================================================
          ABOUT / ESTATÍSTICAS (mantido escuro)
      ======================================================== */}
      <section className="py-12 px-6 sm:px-12 lg:px-24 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-2xl font-bold">Estatísticas & Progresso</h3>
            <p className="mt-3 text-gray-300">
              Acompanhe seu desempenho em simulados e visualize sua evolução.
            </p>
            <Link
              to="/stats"
              className="inline-block mt-4 bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 transition"
            >
              Ver Estatísticas
            </Link>
          </div>

          <div className="flex-1">
            <img
              src="https://source.unsplash.com/800x600/?analytics,chart"
              alt="Estatísticas"
              className="rounded-lg w-full object-cover h-56"
            />
          </div>
        </div>
      </section>

      {/* =======================================================
          CONTATO — agora com FUNDO CINZA CLARO
      ======================================================== */}
      <section className="py-12 px-6 sm:px-12 lg:px-24 bg-[#f7f7f7] text-black border-t border-gray-300">
        <div className="max-w-4xl mx-auto text-center">
          <h4 className="text-2xl font-bold">Fale conosco</h4>
          <p className="mt-3 text-gray-700">
            Sugestões, dúvidas ou problemas? Envie uma mensagem!
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* CARD DE SUPORTE */}
            <div className="bg-white border border-gray-300 p-6 rounded-lg text-left">
              <h5 className="font-semibold text-gray-900">Suporte</h5>
              <p className="mt-2 text-sm text-gray-700">
                Email: suporte@enemstation.example
              </p>
              <p className="mt-2 text-sm text-gray-700">
                Telefone: (00) 0 0000-0000
              </p>
            </div>

            {/* FORMULÁRIO */}
            <form
              className="bg-white border border-gray-300 p-6 rounded-lg"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Mensagem enviada!");
              }}
            >
              <label className="block text-sm text-gray-700">Nome</label>
              <input
                className="w-full mt-2 p-3 rounded-md bg-gray-100 border border-gray-300 outline-none"
                placeholder="Seu nome"
                required
              />

              <label className="block text-sm mt-4 text-gray-700">Mensagem</label>
              <textarea
                className="w-full mt-2 p-3 rounded-md bg-gray-100 border border-gray-300 outline-none"
                rows={5}
                placeholder="Escreva sua mensagem..."
                required
              />

              <div className="mt-4 flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-500 transition"
                >
                  <FaEnvelope />
                  Enviar Mensagem
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
