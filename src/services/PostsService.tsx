import apiClient from "../router/Interceptor";
import { PostData, PostsResponse, PostResponse } from "../data/postsData";
import IndexedDBService from "../services/IndexedDBService";
import { AxiosError } from "axios";

const PostService = {
  async getAllPosts(
    page: number = 1,
    limit: number = 10
  ): Promise<PostsResponse> {
    const cacheKey = `posts-page-${page}-limit-${limit}`;

    try {
      console.log(`📡 Obteniéndolos posts de la API...`);
      const response = await apiClient.get(
        `/posts/getPosts?page=${page}&limit=${limit}`
      );

      // Guardar en IndexedDB con clave específica
      await IndexedDBService.saveData("posts", cacheKey, response.data);
      console.log(`✅ Posts obtenidos de la API y guardados en caché`);
      return response.data;
    } catch (error) {
      console.log(`❌ Error en API, intentando recuperar del caché...`);

      // Intentar recuperar del caché si falla la solicitud
      const cachedData = await IndexedDBService.getData("posts", cacheKey);

      if (cachedData) {
        console.log(`🎯 Posts recuperados del caché`);
        return cachedData;
      }

      // Si no hay caché, lanzar el error manejado
      throw this.handleError(error);
    }
  },

  async getPostById(id: number): Promise<PostResponse> {
    const cacheKey = `post-${id}`;

    try {
      console.log(`📡 Obteniendo post ${id} de la API...`);
      const response = await apiClient.get(`/posts/getPostById/${id}`);

      // Cachear el post individual
      await IndexedDBService.saveData("posts", cacheKey, response.data);
      console.log(`✅ Post ${id} obtenido de la API y guardado en caché`);
      return response.data;
    } catch (error) {
      console.log(`❌ Error en API, intentando recuperar del caché...`);

      // Intentar recuperar del caché
      const cachedData = await IndexedDBService.getData("posts", cacheKey);

      if (cachedData) {
        console.log(`🎯 Post ${id} recuperado del caché`);
        return cachedData;
      }

      throw this.handleError(error);
    }
  },

  async getPostsByUser(id_usuario: number): Promise<PostsResponse> {
    const cacheKey = `posts-user-${id_usuario}`;

    try {
      console.log(`📡 Obteniendo posts del usuario ${id_usuario}...`);
      const response = await apiClient.get(`/posts/user/${id_usuario}`);

      await IndexedDBService.saveData("posts", cacheKey, response.data);
      console.log(`✅ Posts del usuario guardados en caché`);
      return response.data;
    } catch (error) {
      const cachedData = await IndexedDBService.getData("posts", cacheKey);

      if (cachedData) {
        console.log(`🎯 Posts del usuario recuperados del caché`);
        return cachedData;
      }

      throw this.handleError(error);
    }
  },

  async getPostsByCategory(id_categoria: number): Promise<PostsResponse> {
    const cacheKey = `posts-category-${id_categoria}`;

    try {
      console.log(`📡 Obteniendo posts de la categoría ${id_categoria}...`);
      const response = await apiClient.get(`/posts/category/${id_categoria}`);

      await IndexedDBService.saveData("posts", cacheKey, response.data);
      console.log(`✅ Posts de categoría guardados en caché`);
      return response.data;
    } catch (error) {
      const cachedData = await IndexedDBService.getData("posts", cacheKey);

      if (cachedData) {
        console.log(`🎯 Posts de categoría recuperados del caché`);
        return cachedData;
      }

      throw this.handleError(error);
    }
  },

  async getPostByTitle(titulo: string): Promise<PostResponse> {
    try {
      const response = await apiClient.get(
        `/posts/getPostByTitle/${encodeURIComponent(titulo)}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async search(term: string): Promise<PostsResponse> {
    try {
      const response = await apiClient.get(
        `/posts/search?term=${encodeURIComponent(term)}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async createPost(postData: PostData) {
    try {
      const response = await apiClient.post("/posts/createPost", postData);

      // Limpiar caché de posts después de crear uno nuevo
      await IndexedDBService.clearStore("posts");

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async updatePost(id: number, postData: PostData) {
    try {
      const response = await apiClient.patch(
        `/posts/updatePost/${id}`,
        postData
      );

      // Limpiar caché del post específico
      await IndexedDBService.deleteData("posts", `post-${id}`);

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async deletePost(id: number) {
    try {
      const response = await apiClient.delete(`/posts/deletePost/${id}`);

      // Limpiar caché del post eliminado
      await IndexedDBService.deleteData("posts", `post-${id}`);

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  handleError(error: unknown): Error {
    let errorMessage = "Error desconocido";
    let errorStatus: number | null = null;

    if (error instanceof AxiosError) {
      console.error("Error de respuesta:", error.response?.data);
      const data = error.response?.data || {};
      const detail = (data as any)?.error ?? (data as any)?.message ?? null;
      errorMessage =
        typeof detail === "string" && detail
          ? detail
          : (data as any)?.message || "Error en el servidor";
      errorStatus = error.response?.status || null;

      const newError: any = new Error(errorMessage);
      if (errorStatus) newError.status = errorStatus;
      newError.response = error.response;
      newError.error = (data as any)?.error ?? null;
      return newError;
    } else if (error instanceof Error) {
      console.error("Error:", error.message);
      return error;
    } else {
      console.error("Error desconocido:", error);
      return new Error(errorMessage);
    }
  },
};

export default PostService;
