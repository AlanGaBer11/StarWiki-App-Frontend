import apiClient from "../router/Interceptor";
import { PostData, PostsResponse, PostResponse } from "../data/postsData";

const PostService = {
  async getAllPosts(
    page: number = 1,
    limit: number = 10
  ): Promise<PostsResponse> {
    try {
      const response = await apiClient.get(
        `/posts/getPosts?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async getPostById(id: number): Promise<PostResponse> {
    try {
      const response = await apiClient.get(`/posts/getPostById/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async getPostsByUser(id_usuario: number): Promise<PostsResponse> {
    try {
      const response = await apiClient.get(`/posts/user/${id_usuario}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async getPostsByCategory(id_categoria: number): Promise<PostsResponse> {
    try {
      const response = await apiClient.get(`/posts/category/${id_categoria}`);
      return response.data;
    } catch (error) {
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
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async deletePost(id: number) {
    try {
      const response = await apiClient.delete(`/posts/deletePost/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  handleError(error: any) {
    let errorMessage = "Error desconocido";
    let errorStatus: number | null = null;

    if (error.response) {
      console.error("Error de respuesta:", error.response.data);
      errorMessage = error.response.data.message || "Error en el servidor";
      errorStatus = error.response.status;
    } else if (error.request) {
      console.error("Error de solicitud:", error.request);
      errorMessage = "No se pudo conectar con el servidor";
    } else {
      console.error("Error:", error.message);
      errorMessage = error.message;
    }

    const newError: any = new Error(errorMessage);
    if (errorStatus) newError.status = errorStatus;
    return newError;
  },
};

export default PostService;
