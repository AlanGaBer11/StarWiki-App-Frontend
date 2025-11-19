import apiClient from "../router/Interceptor";
import { UserData, UsersResponse, UserResponse } from "../data/userData";

const UserService = {
  async getAllUsers(
    page: number = 1,
    limit: number = 10
  ): Promise<UsersResponse> {
    try {
      const response = await apiClient.get(
        `/users/getUsers?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async getUserById(id: number): Promise<UserResponse> {
    try {
      const response = await apiClient.get(`/users/getUserById/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async createUser(userData: UserData) {
    try {
      const response = await apiClient.post("/users/createUser", userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async updateUser(id: number, userData: UserData) {
    try {
      const response = await apiClient.patch(
        `/users/updateUser/${id}`,
        userData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async deleteUser(id: number) {
    try {
      const response = await apiClient.delete(`/users/deleteUser/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async deactivateUser(id: number, code: string) {
    try {
      const response = await apiClient.patch(`/users/deactivateUser/${id}`, {
        code,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async reactivateUser(id: number, code: string) {
    try {
      const response = await apiClient.patch(`/users/reactivateUser/${id}`, {
        code,
      });
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

export default UserService;
