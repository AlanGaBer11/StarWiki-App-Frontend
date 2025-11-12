export interface PostData {
  id?: number;
  titulo: string;
  contenido: string;
  url_imagen: string;
  fecha_publicacion?: string;
  fecha_actualizacion?: string;
  estado?: "PUBLICADO" | "BORRADOR" | "ARCHIVADO";
  User?: {
    id?: number;
    nombre?: string;
    apellido?: string;
    nombre_usuario: string;
    email?: string;
    avatar_url?: string;
    fecha_registro?: string;
  };
  Category?: {
    id?: number;
    nombre?: string;
    descripcion?: string;
    fecha_creacion?: string;
  };
  nombre_categoria?: string;
}

export interface PostsResponse {
  success: boolean;
  status: number;
  message: string;
  pagination: {
    currentPage: number;
    totalPages: number;
    postsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  posts: PostData[];
}

export interface PostResponse {
  success: boolean;
  status: number;
  message: string;
  post: PostData;
}
