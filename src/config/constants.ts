import { Camera, Heart, PartyPopper } from "lucide-react";

// Paleta de cores do casamento
export const colorPalette = [
  { name: "Rosa", color: "#E39CB8" },
  { name: "Terracota", color: "#a0522d" },
  { name: "Marrom Claro", color: "#d2b48c" },
];

// Cronograma de eventos do casamento
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
    description: "A cerimônia de casamento",
    icon: Heart,
  },
  {
    time: "18:00",
    title: "Mesa de frios e bar",
    description: "Aperitivos e drinks especiais",
    icon: PartyPopper,
  },
  {
    time: "19:30",
    title: "Jantar",
    description: "Início da festa e comemoração",
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

// Informações do RSVP
export const rsvpInfo = {
  contactName: "Angélica Moreno Eventos",
  phone: "(14) 99842-4381",
  whatsappLink: "https://wa.link/ft3fpp",
  deadline: "10/03/2026",
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
export const storyParagraphs = [
  "Nossa história é feita de momentos simples que se tornaram inesquecíveis. Desde o início, sabíamos que tinhamos encontrado algo raro e especial.",
  "Desde o primeiro encontro, soubemos que havia algo especial entre nós. Os risos compartilhados, as conversas que se estendiam pela madrugada e a conexão instantânea que sentimos um pelo outro.",
  "Ao longo dos anos, nossa relação cresceu e se fortaleceu. Passamos por diversos momentos juntos, sempre apoiando um ao outro e construindo nossos sonhos lado a lado.",
  "Hoje, estamos aqui para celebrar esse amor que nos une e iniciar uma nova jornada como marido e mulher. Queremos que vocês, nossos queridos familiares e amigos, sejam parte deste momento tão especial.",
];
