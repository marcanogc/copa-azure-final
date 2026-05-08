export interface Sector {
  id: string;
  name: string;
  price: number;
  capacity: number;
  description: string;
}

export interface Stadium {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  capacity: number;
  inaugurationYear: number;
  image: string;
  description: string;
  sectors: Sector[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const stadiums: Stadium[] = [
  // USA Stadiums (11)
  {
    id: "metlife",
    name: "MetLife Stadium",
    city: "East Rutherford, NJ",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 82500,
    inaugurationYear: 2010,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Metlife_stadium_%28Aerial_view%29.jpg/800px-Metlife_stadium_%28Aerial_view%29.jpg",
    description: "Casa do New York Giants e New York Jets, será palco da final da Copa do Mundo 2026.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 2500, capacity: 5000, description: "Assentos premium com vista privilegiada, acesso a lounge exclusivo e serviço de alimentação incluso." },
      { id: "cat1", name: "Categoria 1", price: 1200, capacity: 25000, description: "Assentos nas áreas centrais do estádio com excelente visibilidade do campo." },
      { id: "cat2", name: "Categoria 2", price: 600, capacity: 52500, description: "Assentos nas áreas laterais e superiores, ótimo custo-benefício." },
    ],
    coordinates: { lat: 40.8128, lng: -74.0742 },
  },
  {
    id: "att",
    name: "AT&T Stadium",
    city: "Arlington, TX",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 80000,
    inaugurationYear: 2009,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Arlington_June_2020_4_%28AT%26T_Stadium%29.jpg/800px-Arlington_June_2020_4_%28AT%26T_Stadium%29.jpg",
    description: "Conhecido como 'Jerry World', possui um dos maiores telões do mundo e teto retrátil.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 2200, capacity: 4500, description: "Suítes privativas com catering exclusivo e acesso ao campo pré-jogo." },
      { id: "cat1", name: "Categoria 1", price: 1000, capacity: 22000, description: "Vista central com cobertura do telão gigante." },
      { id: "cat2", name: "Categoria 2", price: 500, capacity: 53500, description: "Setores superiores com visão panorâmica." },
    ],
    coordinates: { lat: 32.7473, lng: -97.0945 },
  },
  {
    id: "sofi",
    name: "SoFi Stadium",
    city: "Los Angeles, CA",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 70240,
    inaugurationYear: 2020,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/SoFi_Stadium_2023.jpg/800px-SoFi_Stadium_2023.jpg",
    description: "O estádio mais caro já construído, com arquitetura futurista e tecnologia de ponta.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 2800, capacity: 4000, description: "Experiência ultra-premium com champagne, buffet gourmet e meet & greet." },
      { id: "cat1", name: "Categoria 1", price: 1400, capacity: 20000, description: "Assentos centrais com acesso a áreas exclusivas." },
      { id: "cat2", name: "Categoria 2", price: 700, capacity: 46240, description: "Ampla visibilidade em setores elevados." },
    ],
    coordinates: { lat: 33.9535, lng: -118.3392 },
  },
  {
    id: "hardrock",
    name: "Hard Rock Stadium",
    city: "Miami Gardens, FL",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 65326,
    inaugurationYear: 1987,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Hard_Rock_Stadium_for_Super_Bowl_LIV_%2849606710103%29.jpg/800px-Hard_Rock_Stadium_for_Super_Bowl_LIV_%2849606710103%29.jpg",
    description: "Casa do Miami Dolphins, recebeu Super Bowls e será um dos principais palcos da Copa.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 2000, capacity: 3500, description: "Camarotes climatizados com vista panorâmica." },
      { id: "cat1", name: "Categoria 1", price: 950, capacity: 18000, description: "Setores centrais cobertos." },
      { id: "cat2", name: "Categoria 2", price: 450, capacity: 43826, description: "Arquibancadas descobertas com ambiente vibrante." },
    ],
    coordinates: { lat: 25.958, lng: -80.2389 },
  },
  {
    id: "levis",
    name: "Levi's Stadium",
    city: "Santa Clara, CA",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 68500,
    inaugurationYear: 2014,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Levi%27s_Stadium_in_February_2016_prior_to_Super_Bowl_50_%2824398261729%29.jpg/800px-Levi%27s_Stadium_in_February_2016_prior_to_Super_Bowl_50_%2824398261729%29.jpg",
    description: "Estádio sustentável do San Francisco 49ers com tecnologia verde.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 2100, capacity: 3800, description: "Lounges com terraço e vista do Vale do Silício." },
      { id: "cat1", name: "Categoria 1", price: 980, capacity: 19000, description: "Assentos premium no nível do campo." },
      { id: "cat2", name: "Categoria 2", price: 480, capacity: 45700, description: "Setores superiores com excelente acústica." },
    ],
    coordinates: { lat: 37.4033, lng: -121.9694 },
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz Stadium",
    city: "Atlanta, GA",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 71000,
    inaugurationYear: 2017,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Mercedes_Benz_Stadium_time_lapse_capture_2017-08-13.jpg/800px-Mercedes_Benz_Stadium_time_lapse_capture_2017-08-13.jpg",
    description: "Teto retrátil único em formato de câmera e o maior sistema de vídeo 360° do mundo.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1900, capacity: 4200, description: "Suítes com bar privativo e serviço de concierge." },
      { id: "cat1", name: "Categoria 1", price: 900, capacity: 20000, description: "Vista central sob o icônico teto retrátil." },
      { id: "cat2", name: "Categoria 2", price: 420, capacity: 46800, description: "Setores com preços acessíveis da NFL." },
    ],
    coordinates: { lat: 33.7553, lng: -84.401 },
  },
  {
    id: "nrg",
    name: "NRG Stadium",
    city: "Houston, TX",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 72220,
    inaugurationYear: 2002,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Nrg_stadium.jpg/800px-Nrg_stadium.jpg",
    description: "Primeiro estádio da NFL com teto retrátil, casa do Houston Texans.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1850, capacity: 4000, description: "Acesso exclusivo ao clube privativo Field Level." },
      { id: "cat1", name: "Categoria 1", price: 850, capacity: 21000, description: "Assentos no nível médio com cobertura." },
      { id: "cat2", name: "Categoria 2", price: 400, capacity: 47220, description: "Ambiente texano autêntico nas arquibancadas." },
    ],
    coordinates: { lat: 29.6847, lng: -95.4107 },
  },
  {
    id: "lincoln",
    name: "Lincoln Financial Field",
    city: "Philadelphia, PA",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 69796,
    inaugurationYear: 2003,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Lincoln_Financial_Field_%28Aerial_view%29.jpg/800px-Lincoln_Financial_Field_%28Aerial_view%29.jpg",
    description: "Casa dos Philadelphia Eagles, conhecido pela atmosfera intensa dos torcedores.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1800, capacity: 3800, description: "Suítes aquecidas com catering premium." },
      { id: "cat1", name: "Categoria 1", price: 820, capacity: 19000, description: "Setores centrais com cobertura parcial." },
      { id: "cat2", name: "Categoria 2", price: 380, capacity: 46996, description: "Arquibancadas tradicionais com torcida apaixonada." },
    ],
    coordinates: { lat: 39.9008, lng: -75.1675 },
  },
  {
    id: "lumen",
    name: "Lumen Field",
    city: "Seattle, WA",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 68740,
    inaugurationYear: 2002,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Qwest_Field_North.jpg/800px-Qwest_Field_North.jpg",
    description: "Conhecido pela acústica que amplifica o barulho da torcida do Seattle Seahawks.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1750, capacity: 3600, description: "Vista para o Monte Rainier e Puget Sound." },
      { id: "cat1", name: "Categoria 1", price: 800, capacity: 18500, description: "Setores cobertos com excelente visibilidade." },
      { id: "cat2", name: "Categoria 2", price: 360, capacity: 46640, description: "Arquibancadas abertas com vista panorâmica." },
    ],
    coordinates: { lat: 47.5952, lng: -122.3316 },
  },
  {
    id: "arrowhead",
    name: "Arrowhead Stadium",
    city: "Kansas City, MO",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 76416,
    inaugurationYear: 1972,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Aerial_view_of_Arrowhead_Stadium_08-31-2013.jpg/800px-Aerial_view_of_Arrowhead_Stadium_08-31-2013.jpg",
    description: "Um dos estádios mais barulhentos do mundo, casa dos Kansas City Chiefs.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1700, capacity: 4200, description: "Chiefs Kingdom Club com churrasco tradicional." },
      { id: "cat1", name: "Categoria 1", price: 780, capacity: 22000, description: "Assentos vermelhos icônicos no nível principal." },
      { id: "cat2", name: "Categoria 2", price: 350, capacity: 50216, description: "Experiência autêntica do Midwest americano." },
    ],
    coordinates: { lat: 39.0489, lng: -94.484 },
  },
  {
    id: "gillette",
    name: "Gillette Stadium",
    city: "Foxborough, MA",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 65878,
    inaugurationYear: 2002,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Gillette_Stadium_%28Top_View%29.jpg/800px-Gillette_Stadium_%28Top_View%29.jpg",
    description: "Casa da dinastia New England Patriots, estádio histórico da NFL.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1900, capacity: 3500, description: "Acesso ao Putnam Club com vista privilegiada." },
      { id: "cat1", name: "Categoria 1", price: 880, capacity: 18000, description: "Setores centrais com proteção climática." },
      { id: "cat2", name: "Categoria 2", price: 420, capacity: 44378, description: "Arquibancadas tradicionais da Nova Inglaterra." },
    ],
    coordinates: { lat: 42.0909, lng: -71.2643 },
  },
  
  // Mexico Stadiums (3)
  {
    id: "azteca",
    name: "Estadio Azteca",
    city: "Cidade do México",
    country: "México",
    countryCode: "MEX",
    capacity: 87523,
    inaugurationYear: 1966,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Estadio_Azteca_y_sus_alrededores_46.jpg/800px-Estadio_Azteca_y_sus_alrededores_46.jpg",
    description: "Lendário estádio que sediou duas finais de Copa do Mundo (1970 e 1986). Em 2026, será o único estádio a receber 3 finais de Copa.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1600, capacity: 5000, description: "Palcos históricos com serviço de luxo mexicano." },
      { id: "cat1", name: "Categoria 1", price: 700, capacity: 25000, description: "Setores centrais com vista para o gramado sagrado." },
      { id: "cat2", name: "Categoria 2", price: 300, capacity: 57523, description: "Arquibancadas vibrantes com a paixão mexicana." },
    ],
    coordinates: { lat: 19.3029, lng: -99.1505 },
  },
  {
    id: "bbva",
    name: "Estadio BBVA",
    city: "Monterrey",
    country: "México",
    countryCode: "MEX",
    capacity: 53500,
    inaugurationYear: 2015,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mexico_Guadalupe_Monterrey_Estadio_BBVA_Bancomer_fifa_world_cup_2026_6.JPG/800px-Mexico_Guadalupe_Monterrey_Estadio_BBVA_Bancomer_fifa_world_cup_2026_6.JPG",
    description: "Moderno estádio do Monterrey com arquitetura premiada internacionalmente. Apelidado de 'El Gigante de Acero'.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1400, capacity: 3000, description: "Suítes com vista para as montanhas de Monterrey." },
      { id: "cat1", name: "Categoria 1", price: 650, capacity: 15000, description: "Assentos premium com cobertura total." },
      { id: "cat2", name: "Categoria 2", price: 280, capacity: 35500, description: "Setores abertos com ambiente festivo." },
    ],
    coordinates: { lat: 25.6697, lng: -100.2447 },
  },
  {
    id: "akron",
    name: "Estadio Akron",
    city: "Guadalajara",
    country: "México",
    countryCode: "MEX",
    capacity: 49850,
    inaugurationYear: 2010,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Estadio_Akron_02-07-2022_cabecera_sur_lado_derecho_%283%29.jpg/800px-Estadio_Akron_02-07-2022_cabecera_sur_lado_derecho_%283%29.jpg",
    description: "Casa das Chivas Rayadas. Arquitetura inspirada em um vulcão com nuvem de fumaça.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1350, capacity: 2800, description: "Experiência premium com tequila artesanal." },
      { id: "cat1", name: "Categoria 1", price: 620, capacity: 14000, description: "Setores vermelhos e brancos tradicionais." },
      { id: "cat2", name: "Categoria 2", price: 260, capacity: 33050, description: "Arquibancadas populares de Jalisco." },
    ],
    coordinates: { lat: 20.6817, lng: -103.4627 },
  },
  
  // Canada Stadiums (2)
  {
    id: "bcplace",
    name: "BC Place",
    city: "Vancouver",
    country: "Canadá",
    countryCode: "CAN",
    capacity: 54500,
    inaugurationYear: 1983,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/BC_Place_2015_Women%27s_FIFA_World_Cup.jpg/800px-BC_Place_2015_Women%27s_FIFA_World_Cup.jpg",
    description: "Maior estádio coberto do Canadá. Sediou a final da Copa do Mundo Feminina de 2015.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1800, capacity: 3200, description: "Lounges com vista para as North Shore Mountains." },
      { id: "cat1", name: "Categoria 1", price: 850, capacity: 16000, description: "Assentos centrais sob o teto retratável." },
      { id: "cat2", name: "Categoria 2", price: 400, capacity: 35300, description: "Setores com ambiente multicultural de Vancouver." },
    ],
    coordinates: { lat: 49.2768, lng: -123.1117 },
  },
  {
    id: "bmo",
    name: "BMO Field",
    city: "Toronto",
    country: "Canadá",
    countryCode: "CAN",
    capacity: 45500,
    inaugurationYear: 2007,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Toronto_BMO_Field_in_2024.jpg/800px-Toronto_BMO_Field_in_2024.jpg",
    description: "Principal estádio de futebol do Canadá, casa do Toronto FC. Expandido para a Copa 2026.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1700, capacity: 2800, description: "Vista para o skyline de Toronto e CN Tower." },
      { id: "cat1", name: "Categoria 1", price: 820, capacity: 13000, description: "Setores premium com aquecimento." },
      { id: "cat2", name: "Categoria 2", price: 380, capacity: 29700, description: "Arquibancadas ao ar livre estilo europeu." },
    ],
    coordinates: { lat: 43.6332, lng: -79.4186 },
  },
];

export const getStadiumById = (id: string): Stadium | undefined => {
  return stadiums.find(stadium => stadium.id === id);
};

export const getStadiumsByCountry = (countryCode: string): Stadium[] => {
  return stadiums.filter(stadium => stadium.countryCode === countryCode);
};
