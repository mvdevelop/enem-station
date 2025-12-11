
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Sidebar from "../components/Sidebar";

interface ConteudoItem {
  id: string;
  titulo: string;
  texto: string;
  materia: string;
  submateria: string;
}

export default function Conteudo() {
  const { materia, submateria } = useParams();
  const [conteudo, setConteudo] = useState<ConteudoItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data, error } = await supabase
        .from("conteudos")
        .select("*")
        .eq("materia", materia)
        .eq("submateria", submateria)
        .single();

      if (!error) setConteudo(data);
      setLoading(false);
    }

    fetchData();
  }, [materia, submateria]);

  if (loading)
    return (
      <p className="text-center p-6 text-gray-400">
        Carregando...
      </p>
    );

  if (!conteudo)
    return (
      <p className="text-center p-6 text-red-500">
        Nenhum conteúdo encontrado.
      </p>
    );

  return (
    <div className="flex w-full min-h-screen bg-gray-900 text-white">
      {/* Sidebar fixa SOMENTE nesta página */}
      <Sidebar />

      {/* Área de conteúdo */}
      <main className="flex-1 p-6 md:p-10 overflow-x-hidden max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          {conteudo.titulo}
        </h1>

        <article className="prose prose-invert leading-relaxed">
          {conteudo.texto}
        </article>
      </main>
    </div>
  );
}
