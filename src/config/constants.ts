import { Camera, Heart, PartyPopper } from "lucide-react";

// Paleta de cores do casamento
export const colorPalette = [
  { name: "Rosa", color: "#E39CB8" },
  { name: "Terracota", color: "#a0522d" },
  { name: "Marrom Claro", color: "#d2b48c" },
];

// Cronograma de eventos do casamento
// TODO: definir cronograma
export const timelineEvents = [
  {
    time: "16:30",
    title: "Recepção dos Convidados",
    description: "Chegada e acomodação dos convidados",
    icon: Heart,
  },
  {
    time: "17:00",
    title: "Cerimônia",
    description: "Momento sagrado da união",
    icon: Heart,
  },
  {
    time: "17:45",
    title: "Sessão de Fotos",
    description: "Registrando momentos especiais",
    icon: Camera,
  },
  {
    time: "19:00",
    title: "Coquetel",
    description: "Início da festa e celebração",
    icon: PartyPopper,
  },
];

// Informações do casamento
export const weddingInfo = {
  confirmDate: new Date("2026-02-17T00:00:00"),
  weddingDate: new Date("2026-04-17T17:00:00"),
  ceremonyDate: new Date("2026-04-17T17:00:00"),
  partyDate: new Date("2026-04-17T19:00:00"),
  venue: {
    name: "Vila de São Francisco",
    address: "Rod. Marechal Rondon Km 332 Bauru - Agudos",
    mapsUrl: "https://maps.app.goo.gl/S1igY4rv3Y6f8oyNA",
  },
};

// Informações dos noivos
export const coupleInfo = {
  bride: "Noemy",
  groom: "Guilherme",
};

// Galeria de imagens
export const galleryImages = [
  "imgs/gallery-01.jpg",
  "imgs/gallery-03.jpg",
  "imgs/gallery-02.jpg",
  "imgs/gallery-04.jpg",
];

// História do casal
// TODO: definir texto 
export const storyParagraphs = [
  "Nossa história começou de uma forma muito especial. Nos conhecemos em um momento inesperado da vida, quando menos esperávamos encontrar o amor verdadeiro.",
  "Desde o primeiro encontro, soubemos que havia algo especial entre nós. Os risos compartilhados, as conversas que se estendiam pela madrugada e a conexão instantânea que sentimos um pelo outro.",
  "Ao longo dos anos, nossa relação cresceu e se fortaleceu. Passamos por diversos momentos juntos, sempre apoiando um ao outro e construindo nossos sonhos lado a lado.",
  "Hoje, estamos aqui para celebrar esse amor que nos une e iniciar uma nova jornada como marido e mulher. Queremos que vocês, nossos queridos familiares e amigos, sejam parte deste momento tão especial.",
];
