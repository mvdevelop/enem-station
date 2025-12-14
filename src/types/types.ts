
export interface Subtopico {
  nome: string;
  conteudo: string;
}

export interface Materia {
  nome: string;
  subtopicos: Subtopico[];
}

export interface AreasConhecimento {
  nome: string;
  materias: Materia[];
}

export interface CompetenciaRedacao {
  nome: string;
  descricao: string;
}

export interface Redacao {
  caracteristicas: string[];
  competencias: CompetenciaRedacao[];
  estrutura: {
    introducao: string;
    desenvolvimento: string;
    conclusao: string;
  };
  dicas: string[];
}

export interface Estatisticas {
  total_areas: number;
  total_materias: number;
  total_subtopicos: number;
  questoes_por_area: {
    Linguagens: number;
    Matematica: number;
    Natureza: number;
    Humanas: number;
  };
  tempo_prova: string;
  pontuacao_maxima: number;
}

export interface ENEMData {
  ENEM: {
    AreasConhecimento: AreasConhecimento[];
    Redacao: Redacao;
    estatisticas: Estatisticas;
  };
}
