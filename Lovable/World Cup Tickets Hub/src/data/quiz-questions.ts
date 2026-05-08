// 20 perguntas sobre a história da Copa do Mundo FIFA.
// Mix de dificuldades: 7 fáceis, 8 médias, 5 difíceis.
// Cada pergunta tem 4 alternativas + explicação educativa.

export type Difficulty = 'facil' | 'medio' | 'dificil';

export interface QuizQuestion {
  id: number;
  difficulty: Difficulty;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    difficulty: "facil",
    topic: "Origens",
    question: "Em qual ano foi disputada a primeiríssima Copa do Mundo FIFA?",
    options: ["1928", "1930", "1934", "1938"],
    correctIndex: 1,
    explanation:
      "A primeira Copa do Mundo aconteceu em 1930, no Uruguai, com 13 seleções participantes. Os anfitriões venceram a Argentina por 4×2 na final no Estádio Centenário, em Montevidéu.",
  },
  {
    id: 2,
    difficulty: "facil",
    topic: "Brasil",
    question: "Quantos títulos mundiais o Brasil possui?",
    options: ["3", "4", "5", "6"],
    correctIndex: 2,
    explanation:
      "O Brasil é pentacampeão mundial — 1958 (Suécia), 1962 (Chile), 1970 (México), 1994 (EUA) e 2002 (Coreia/Japão). É também o único país a ter participado de TODAS as 22 Copas da história.",
  },
  {
    id: 3,
    difficulty: "facil",
    topic: "2026",
    question: "Quantas seleções disputarão a Copa do Mundo de 2026?",
    options: ["32", "40", "48", "64"],
    correctIndex: 2,
    explanation:
      "A Copa de 2026 será a primeira com 48 seleções (em vez das 32 tradicionais). Serão 12 grupos de 4, com os 2 primeiros + os 8 melhores 3º colocados avançando aos 32 avos de final.",
  },
  {
    id: 4,
    difficulty: "facil",
    topic: "2026",
    question: "Em qual estádio será disputada a final da Copa de 2026?",
    options: [
      "AT&T Stadium (Dallas)",
      "MetLife Stadium (NY/NJ)",
      "SoFi Stadium (Los Angeles)",
      "Estádio Azteca (Cidade do México)",
    ],
    correctIndex: 1,
    explanation:
      "O MetLife Stadium, em East Rutherford (área metropolitana de Nova York), sediará a final em 19 de julho de 2026. Tem capacidade para 82.500 torcedores e é casa do New York Giants e New York Jets (NFL).",
  },
  {
    id: 5,
    difficulty: "facil",
    topic: "Lendas",
    question: "Quem é o ÚNICO jogador a vencer três Copas do Mundo?",
    options: ["Pelé", "Maradona", "Beckenbauer", "Ronaldo Fenômeno"],
    correctIndex: 0,
    explanation:
      "Pelé venceu três Copas pelo Brasil: 1958 (com 17 anos), 1962 e 1970. Em 1962 ficou lesionado após o 2º jogo, mas é considerado tricampeão. Ele marcou o primeiro gol no jogo final de 1958 e estava em campo na vitória mais memorável de 1970.",
  },
  {
    id: 6,
    difficulty: "facil",
    topic: "2022",
    question: "Quem venceu a Copa do Mundo de 2022 no Catar?",
    options: ["França", "Brasil", "Argentina", "Croácia"],
    correctIndex: 2,
    explanation:
      "A Argentina, comandada por Lionel Messi, conquistou seu 3º título mundial ao derrotar a França nos pênaltis (4×2) após empate por 3×3 — uma das finais mais dramáticas da história. Mbappé fez hat-trick na derrota.",
  },
  {
    id: 7,
    difficulty: "facil",
    topic: "Recordes",
    question: "Qual seleção é a maior campeã mundial?",
    options: ["Itália", "Alemanha", "Brasil", "Argentina"],
    correctIndex: 2,
    explanation:
      "O Brasil é o maior campeão com 5 títulos. Em seguida vêm Itália e Alemanha (4 cada), Argentina, França e Uruguai (2 cada), e Inglaterra e Espanha (1 cada).",
  },

  {
    id: 8,
    difficulty: "medio",
    topic: "Maracanazo",
    question: "Quem venceu o Brasil no histórico 'Maracanazo' de 1950?",
    options: ["Argentina", "Uruguai", "Hungria", "Suécia"],
    correctIndex: 1,
    explanation:
      "O Uruguai virou para 2×1 no Maracanã, com gol de Alcides Ghiggia aos 34 minutos do segundo tempo. 199.854 brasileiros viram a derrota — é considerada a maior tragédia esportiva do país. Os uruguaios chamaram o gol de 'Ghiggiazo'.",
  },
  {
    id: 9,
    difficulty: "medio",
    topic: "Lendas",
    question: "Em qual edição Maradona fez a 'Mão de Deus' e o 'Gol do Século'?",
    options: ["Argentina 1978", "México 1986", "Itália 1990", "EUA 1994"],
    correctIndex: 1,
    explanation:
      "Os dois gols históricos contra a Inglaterra aconteceram nas quartas de final da Copa de 1986, no México. Em 4 minutos, Maradona protagonizou o gol mais polêmico (mão) e o mais bonito (driblando 5 ingleses) da história das Copas. A Argentina venceria o título.",
  },
  {
    id: 10,
    difficulty: "medio",
    topic: "Recordes",
    question: "Quem é o maior artilheiro da história das Copas com 16 gols?",
    options: ["Pelé", "Ronaldo Fenômeno", "Miroslav Klose", "Gerd Müller"],
    correctIndex: 2,
    explanation:
      "Miroslav Klose, da Alemanha, marcou 16 gols em 4 Copas (2002, 2006, 2010 e 2014), superando Ronaldo Fenômeno (15) em 2014. É o ÚNICO jogador a estar entre os 3 maiores artilheiros de quatro Copas seguidas.",
  },
  {
    id: 11,
    difficulty: "medio",
    topic: "Recordes",
    question: "Em que Copa Iniesta marcou o gol do título da Espanha aos 116 minutos?",
    options: [
      "Alemanha 2006",
      "África do Sul 2010",
      "Brasil 2014",
      "Rússia 2018",
    ],
    correctIndex: 1,
    explanation:
      "Em 11 de julho de 2010, em Joanesburgo, Iniesta marcou aos 116 minutos da prorrogação contra a Holanda — primeiro título mundial da Espanha. A campanha foi histórica: Espanha perdeu a estreia para a Suíça e venceu os 6 jogos seguintes por 1×0.",
  },
  {
    id: 12,
    difficulty: "medio",
    topic: "Brasil",
    question: "Qual o placar da histórica derrota do Brasil para a Alemanha em 2014?",
    options: ["5×0", "6×1", "7×1", "8×0"],
    correctIndex: 2,
    explanation:
      "Em 8 de julho de 2014, no Mineirão, a Alemanha venceu por 7×1 na semifinal — derrota conhecida como 'Mineirazo'. Em 6 minutos do primeiro tempo, os alemães fizeram 4 gols. Klose marcou o gol que o tornou maior artilheiro da história das Copas.",
  },
  {
    id: 13,
    difficulty: "medio",
    topic: "Lendas",
    question:
      "Pelé tinha quantos anos quando marcou na final da Copa de 1958, contra a Suécia?",
    options: ["16", "17", "18", "19"],
    correctIndex: 1,
    explanation:
      "Pelé tinha 17 anos e 249 dias quando marcou 2 gols na vitória de 5×2 sobre a Suécia em Estocolmo. Ainda hoje é o jogador mais jovem a marcar em uma final de Copa do Mundo. Foi seu primeiro de 3 títulos mundiais.",
  },
  {
    id: 14,
    difficulty: "medio",
    topic: "Recordes",
    question: "Em qual estádio aconteceram as finais de 1970 e 1986?",
    options: ["Maracanã", "Estádio Azteca", "Wembley", "Centenário"],
    correctIndex: 1,
    explanation:
      "O Estádio Azteca, na Cidade do México, é o único estádio a ter sediado DUAS finais de Copa: Brasil 4×1 Itália em 1970 e Argentina 3×2 Alemanha Ocidental em 1986. Em 2026 sediará a partida de abertura da Copa.",
  },
  {
    id: 15,
    difficulty: "medio",
    topic: "Modernos",
    question: "Quem foi a primeira seleção africana a chegar à semifinal de uma Copa?",
    options: ["Camarões (1990)", "Senegal (2002)", "Gana (2010)", "Marrocos (2022)"],
    correctIndex: 3,
    explanation:
      "Marrocos fez história em 2022, no Catar, ao se tornar a primeira seleção africana E primeira árabe a chegar à semifinal — eliminou Bélgica, Espanha (pênaltis) e Portugal antes de cair para a França. Camarões (1990), Senegal (2002) e Gana (2010) chegaram apenas até as quartas.",
  },

  {
    id: 16,
    difficulty: "dificil",
    topic: "Recordes",
    question:
      "Quem detém o recorde de mais gols em UMA ÚNICA Copa do Mundo (com 13 gols em 1958)?",
    options: ["Pelé", "Sándor Kocsis", "Just Fontaine", "Gerd Müller"],
    correctIndex: 2,
    explanation:
      "Just Fontaine, da França, marcou 13 gols em apenas 6 jogos na Copa de 1958, na Suécia — recorde inquebrável até hoje. Sándor Kocsis (Hungria, 11 em 1954) e Gerd Müller (Alemanha, 10 em 1970) são os outros 'top-3'. Pelé fez 6 em 1958.",
  },
  {
    id: 17,
    difficulty: "dificil",
    topic: "Curiosidades",
    question:
      "Quem foi o capitão da Alemanha campeã na Copa de 2014 no Brasil?",
    options: ["Bastian Schweinsteiger", "Philipp Lahm", "Manuel Neuer", "Lothar Matthäus"],
    correctIndex: 1,
    explanation:
      "Philipp Lahm capitaneou a Alemanha ao tetracampeonato em 2014. Lahm tinha 30 anos e era considerado um dos melhores laterais da história. Aposentou-se da seleção logo após o título, surpreendendo a todos no auge.",
  },
  {
    id: 18,
    difficulty: "dificil",
    topic: "Vergonhas",
    question:
      "O 'Vergonhoso de Gijón' (1982) envolveu Alemanha Ocidental e qual outra seleção?",
    options: ["Itália", "Áustria", "Argélia", "Hungria"],
    correctIndex: 1,
    explanation:
      "Em 1982, Alemanha Ocidental e Áustria 'combinaram' o resultado de 1×0 para a Alemanha — placar que classificava as DUAS e eliminava a Argélia. Após as reclamações, a FIFA passou a fazer os jogos finais de cada grupo SIMULTANEAMENTE para evitar acertos. Foi um dos episódios mais escandalosos da história.",
  },
  {
    id: 19,
    difficulty: "dificil",
    topic: "Curiosidades",
    question:
      "Hakan Şükür marcou o gol mais rápido da história das Copas em 2002. Em quantos segundos?",
    options: ["8 segundos", "11 segundos", "16 segundos", "23 segundos"],
    correctIndex: 1,
    explanation:
      "Hakan Şükür marcou aos 11 segundos contra a Coreia do Sul, na disputa de 3º lugar da Copa de 2002. A Turquia venceu por 3×2 e ficou em 3º — sua melhor campanha em Copas. O recorde anterior era de Václav Mašek (Tchecoslováquia, 16 segundos em 1962).",
  },
  {
    id: 20,
    difficulty: "dificil",
    topic: "História",
    question:
      "Qual seleção foi vice-campeã da Copa em 1934 e 1962 (mas não existe mais)?",
    options: ["União Soviética", "Iugoslávia", "Tchecoslováquia", "Alemanha Oriental"],
    correctIndex: 2,
    explanation:
      "A Tchecoslováquia perdeu duas finais: para a Itália em 1934 (1×2 na prorrogação) e para o Brasil em 1962 (1×3). Em 1993, separou-se pacificamente em Tchéquia e Eslováquia ('Divórcio de Veludo'). Os dois países hoje competem separadamente — a Tchéquia jogará a Copa de 2026.",
  },
];

export const QUIZ_TOTAL = quizQuestions.length;
