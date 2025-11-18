export interface CommentData {
  id?: number;
  contenido: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
  estado?: "PUBLICADO" | "BORRADOR" | "ARCHIVADO";
  Post?: {
    id?: number;
    titulo?: string;
    url_imagen?: string;
  };
  User?: {
    id?: number;
    nombre?: string;
    apellido?: string;
    nombre_usuario: string;
    email?: string;
  };
  titulo_post?: string;
}

export interface CommentsResponse {
  success: boolean;
  status: number;
  message: string;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalComments: number;
    commentsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  comments: CommentData[];
}

export interface CommentResponse {
  success: boolean;
  status: number;
  message: string;
  comment: CommentData;
}
