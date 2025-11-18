import { create } from "zustand";
import CommentService from "../services/CommentService";
import {
  CommentData,
  CommentsResponse,
  CommentResponse,
} from "../data/commentData";

interface CommentState {
  comments: CommentData[];
  selectedComment: CommentData | null;
  loading: boolean;
  error: string | null;

  // Acciones Principales
  fetchComments: (page?: number, limit?: number) => Promise<void>;
  fetchCommentById: (id: number) => Promise<void>;
  fetchCommentsByPost: (
    id_post: number,
    page?: number,
    limit?: number
  ) => Promise<void>;

  createComment: (commentData: {
    titulo_post: string;
    contenido: string;
  }) => Promise<void>;
  updateComment: (
    id: number,
    commentData: { contenido: string }
  ) => Promise<void>;
  deleteComment: (id: number) => Promise<void>;

  clearError: () => void;
}

export const useCommentStore = create<CommentState>((set, get) => ({
  comments: [],
  selectedComment: null,
  loading: false,
  error: null,

  /* Obtener todos los comentarios */
  fetchComments: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const data: CommentsResponse = await CommentService.getAllComments(
        page,
        limit
      );
      set({ comments: data.comments, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Error al cargar los comentarios",
        loading: false,
      });
    }
  },
  /* Obtener comentario por ID */
  fetchCommentById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const data: CommentResponse = await CommentService.getCommentById(id);
      set({ selectedComment: data.comment || null, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Error al cargar el comentario",
        loading: false,
      });
    }
  },
  /* Obtener comentarios por post */
  fetchCommentsByPost: async (id_post: number, page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const data: CommentsResponse = await CommentService.getCommentsByPost(
        id_post,
        page,
        limit
      );
      set({ comments: data.comments, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Error al cargar los comentarios",
        loading: false,
      });
    }
  },
  /* Crear un nuevo comentario */
  createComment: async (commentData) => {
    set({ loading: true, error: null });
    try {
      await CommentService.createComment(commentData);
      await get().fetchComments();
      set({ loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Error al crear el comentario",
        loading: false,
      });
    }
  },
  /* Actualizar un comentario */
  updateComment: async (id: number, commentData) => {
    set({ loading: true, error: null });
    try {
      await CommentService.updateComment(id, commentData);
      await get().fetchComments();
      set({ loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Error al actualizar el comentario",
        loading: false,
      });
    }
  },
  /* Eliminar un comentario */
  deleteComment: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await CommentService.deleteComment(id);
      set({
        comments: get().comments.filter((c) => c.id !== id),
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || "Error al eliminar el comentario",
        loading: false,
      });
    }
  },

  /* Limpiar error */
  clearError: () => set({ error: null }),
}));
