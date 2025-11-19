import apiClient from "../router/Interceptor";
import {
  CommentData,
  CommentsResponse,
  CommentResponse,
} from "../data/commentData";

const CommentService = {
  async getAllComments(
    page: number = 1,
    limit: number = 10
  ): Promise<CommentsResponse> {
    try {
      const response = await apiClient.get(
        `/comments/getComments?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async getCommentById(id: number): Promise<CommentResponse> {
    try {
      const response = await apiClient.get(`/comments/getCommentById/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async getCommentsByPost(
    id_post: number,
    page: number = 1,
    limit: number = 10
  ): Promise<CommentsResponse> {
    try {
      const response = await apiClient.get(
        `/comments/post/${id_post}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async createComment(commentData: CommentData) {
    try {
      const response = await apiClient.post(
        "/comments/createComment",
        commentData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async updateComment(id: number, commentData: CommentData) {
    try {
      const response = await apiClient.patch(
        `/comments/updateComment/${id}`,
        commentData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async deleteComment(id: number) {
    try {
      const response = await apiClient.delete(`/comments/deleteComment/${id}`);
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
      const data = error.response.data || {};
      // Priorizar `error` (detalle) si existe, luego `message`
      const detail = data.error ?? data.message ?? null;
      errorMessage =
        typeof detail === "string" && detail
          ? detail
          : data.message || "Error en el servidor";
      errorStatus = error.response.status;

      const newError: any = new Error(errorMessage);
      if (errorStatus) newError.status = errorStatus;
      // Adjuntar la respuesta original para diagnósticos si hace falta
      newError.response = error.response;
      newError.error = data.error ?? null;
      return newError;
    } else if (error.request) {
      console.error("Error de solicitud:", error.request);
      errorMessage = "No se pudo conectar con el servidor";
    } else {
      console.error("Error:", error.message);
      errorMessage = error.message;
    }

    const newError: any = new Error(errorMessage);
    return newError;
  },
};

export default CommentService;
