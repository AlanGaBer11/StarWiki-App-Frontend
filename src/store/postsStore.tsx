import { create } from "zustand";
import PostService from "../services/PostsService";
import { PostData, PostsResponse, PostResponse } from "../data/postsData";

interface PostState {
  posts: PostData[];
  selectedPost: PostData | null;
  loading: boolean;
  error: string | null;

  // Acciones principales
  fetchPosts: (page?: number, limit?: number) => Promise<void>;
  fetchPostById: (id: number) => Promise<void>;
  fetchPostsByUser: (userId: number) => Promise<void>;
  fetchPostsByCategory: (categoryId: number) => Promise<void>;
  fetchPostByTitle: (title: string) => Promise<void>;
  searchPosts: (term: string) => Promise<void>;

  createPost: (postData: {
    nombre_categoria: string;
    titulo: string;
    contenido: string;
    url_imagen: string;
  }) => Promise<void>;
  updatePost: (
    id: number,
    postData: {
      nombre_categoria: string;
      titulo: string;
      contenido: string;
      url_imagen: string;
    }
  ) => Promise<void>;
  deletePost: (id: number) => Promise<void>;

  clearError: () => void;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,

  /* Obtener todos los posts */
  fetchPosts: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const data: PostsResponse = await PostService.getAllPosts(page, limit);
      set({ posts: data.posts, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Error al cargar los posts",
        loading: false,
      });
    }
  },

  /* Obtener post por ID */
  fetchPostById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const data: PostResponse = await PostService.getPostById(id);
      set({ selectedPost: data.post || null, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Error al cargar el post",
        loading: false,
      });
    }
  },

  /* Obtener posts por usuario */
  fetchPostsByUser: async (userId: number) => {
    set({ loading: true, error: null });
    try {
      const data: PostsResponse = await PostService.getPostsByUser(userId);
      set({ posts: data.posts, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Error al obtener posts del usuario",
        loading: false,
      });
    }
  },

  /* Obtener posts por categoría */
  fetchPostsByCategory: async (categoryId: number) => {
    set({ loading: true, error: null });
    try {
      const data: PostsResponse = await PostService.getPostsByCategory(
        categoryId
      );

      // Si la API responde correctamente pero no hay posts
      if (Array.isArray(data.posts) && data.posts.length > 0) {
        set({ posts: data.posts, loading: false });
      } else {
        // Si no hay posts, mostrar lista vacía sin error
        set({ posts: [], loading: false });
      }
    } catch (error: any) {
      console.warn("Error al obtener posts por categoría:", error.message);
      // En caso de error de red o servidor, limpiar lista sin generar error visible
      set({ posts: [], loading: false });
    }
  },

  /* Obtener post por título */
  fetchPostByTitle: async (title: string) => {
    set({ loading: true, error: null });
    try {
      const data: PostResponse = await PostService.getPostByTitle(title);
      set({
        selectedPost: data.post || null,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || "Error al obtener post por título",
        loading: false,
      });
    }
  },

  /* Buscar posts (término libre) */
  searchPosts: async (term: string) => {
    set({ loading: true, error: null });
    try {
      const data: PostsResponse = await PostService.search(term);
      set({ posts: data.posts, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error en la búsqueda", loading: false });
    }
  },

  /* Crear un nuevo post */
  createPost: async (postData) => {
    set({ loading: true, error: null });
    try {
      await PostService.createPost(postData);
      await get().fetchPosts(); // refrescar lista
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error al crear el post" });
    } finally {
      set({ loading: false });
    }
  },

  /* Actualizar un post */
  updatePost: async (id, postData) => {
    set({ loading: true, error: null });
    try {
      await PostService.updatePost(id, postData);
      await get().fetchPosts();
      set({ loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Error al actualizar el post",
        loading: false,
      });
    }
  },

  /* Eliminar un post */
  deletePost: async (id) => {
    set({ loading: true, error: null });
    try {
      await PostService.deletePost(id);
      set({ posts: get().posts.filter((p) => p.id !== id) });
    } catch (error: any) {
      set({ error: error.message || "Error al eliminar el post" });
    } finally {
      set({ loading: false });
    }
  },

  /** Limpiar errores manualmente */
  clearError: () => set({ error: null }),
}));
