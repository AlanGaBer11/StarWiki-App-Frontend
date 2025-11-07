export interface AnimeData {
  nombre: string;
  imagen?: string;
  descripcion1?: string;
  descripcion2?: string;
  link?: string;
}

export const ANIMES: AnimeData[] = [
  {
    nombre: "Pokémon",
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/9/98/Pok%C3%A9mon_logo.png",
    descripcion1:
      "Pokémon sigue las aventuras de entrenadores que capturan y entrenan criaturas llamadas Pokémon.",
    descripcion2:
      "La franquicia incluye videojuegos, series de TV, películas y una gran comunidad de fans.",
    link: "/pokemon",
  },
  {
    nombre: "One Piece",
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/One_Piece_Logo.svg",
    descripcion1:
      "One Piece narra las aventuras de Monkey D. Luffy y su tripulación en busca del tesoro legendario.",
    descripcion2:
      "Es una de las series de manga y anime más largas y exitosas.",
    link: "/one-piece",
  },
  {
    nombre: "Naruto",
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/9/94/Naruto_logo.svg",
    descripcion1:
      "Naruto es la historia de Naruto Uzumaki, un ninja con el sueño de convertirse en Hokage.",
    descripcion2:
      "Aborda temas de amistad, sacrificio y crecimiento personal a través de intensos combates y técnicas ninja.",
    link: "/naruto",
  },
  {
    nombre: "Dragon Ball",
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Dragon_Ball_Z_logo.svg",
    descripcion1:
      "Dragon Ball sigue a Goku y sus amigos en épicas batallas por proteger la Tierra.",
    descripcion2:
      "Conocido por sus intensas luchas y transformaciones de poder.",
    link: "/dragon-ball",
  },
  {
    nombre: "Demon Slayer",
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/e/e7/Demon_Slayer_logo.svg",
    descripcion1:
      "Demon Slayer cuenta la historia de Tanjiro Kamado y su lucha contra demonios para salvar a su hermana.",
    descripcion2: "Destaca por su animación y coreografías de combate.",
    link: "/demon-slayer",
  },
  {
    nombre: "Attack on Titan",
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/7/7b/Attack_on_Titan_logo.svg",
    descripcion1:
      "Attack on Titan explora un mundo asediado por gigantes devoradores de humanos.",
    descripcion2:
      "La serie mezcla intriga política, misterio y acción intensa.",
    link: "/attack-on-titan",
  },
];
