
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

interface Subtopic {
  id: string;
  title: string;
}

interface Topic {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

export default function Sidebar() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  // controla abertura no mobile
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fakeData: Topic[] = [
      {
        id: "mat1",
        title: "Linguagens e Códigos",
        subtopics: [
          { id: "sub1", title: "Interpretação de Texto" },
          { id: "sub2", title: "Figuras de Linguagem" },
          { id: "sub3", title: "Gramática" },
        ],
      },
      {
        id: "mat2",
        title: "Matemática",
        subtopics: [
          { id: "sub4", title: "Funções" },
          { id: "sub5", title: "Geometria" },
          { id: "sub6", title: "Estatística" },
        ],
      },
      {
        id: "mat3",
        title: "Ciências Humanas",
        subtopics: [
          { id: "sub7", title: "História do Brasil" },
          { id: "sub8", title: "Sociologia" },
          { id: "sub9", title: "Geografia" },
        ],
      },
      {
        id: "mat4",
        title: "Ciências da Natureza",
        subtopics: [
          { id: "sub10", title: "Química" },
          { id: "sub11", title: "Física" },
          { id: "sub12", title: "Biologia" },
        ],
      },
    ];

    setTopics(fakeData);
  }, []);

  const toggleTopic = (id: string) => {
    setOpenTopic((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* 🔥 BOTÃO MOBILE (visível apenas no mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-20 left-4 z-40 bg-gray-800 text-white p-2 rounded-lg shadow-lg"
      >
        <Menu size={26} />
      </button>

      {/* 🔥 BACKDROP (aparece atrás da sidebar) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        ></div>
      )}

      {/* -------------------------- */}
      {/* 🔥 SIDEBAR (desktop + mobile drawer) */}
      {/* -------------------------- */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-full w-64 
          bg-gray-50 text-gray-900 border-r shadow-lg
          p-4 overflow-y-auto

          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Botão de fechar no mobile */}
        <div className="flex justify-between items-center md:hidden mb-4">
          <h2 className="text-xl font-semibold">Conteúdo ENEM</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 bg-gray-200 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Título no desktop */}
        <h2 className="text-xl font-semibold mb-4 hidden md:block">
          Conteúdo ENEM
        </h2>

        <nav className="space-y-2">
          {topics.map((topic) => (
            <div key={topic.id}>
              <button
                onClick={() => toggleTopic(topic.id)}
                className="flex justify-between items-center w-full text-left font-medium px-2 py-2 rounded hover:bg-gray-200"
              >
                {topic.title}
                {openTopic === topic.id ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              {openTopic === topic.id && (
                <ul className="ml-4 mt-1 space-y-1 border-l pl-3 border-gray-300">
                  {topic.subtopics.map((sub) => (
                    <li key={sub.id}>
                      <a
                        href={`/conteudo/${topic.id}/${sub.id}`}
                        className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded cursor-pointer"
                        onClick={() => setIsOpen(false)} // fecha no mobile
                      >
                        {sub.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
