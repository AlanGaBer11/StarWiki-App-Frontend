import apiClient from "../router/Interceptor";
import {
  CategoryData,
  CategoriesResponse,
  CategoryResponse,
} from "../data/categoryData";

const CategoryService = {
  async getAllCategories(
    page: number = 1,
    limit: number = 10
  ): Promise<CategoriesResponse> {
    try {
      const response = await apiClient.get(
        `/categories/getCategories?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async getCategoryById(id: number): Promise<CategoryResponse> {
    try {
      const response = await apiClient.get(`/categories/getCategoryById/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async getCategoryByName(nombre: string): Promise<CategoryResponse> {
    try {
      const response = await apiClient.get(
        `/categories/getCategoryByName/${nombre}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async createCategory(categoryData: CategoryData) {
    try {
      const response = await apiClient.post(
        "/categories/createCategory",
        categoryData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async updateCategory(id: number, categoryData: CategoryData) {
    try {
      const response = apiClient.patch(
        `/categories/updateCategory/${id}`,
        categoryData
      );
      return (await response).data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async deleteCategory(id: number) {
    try {
      const response = await apiClient.delete(
        `/categories/deleteCategory/${id}`
      );
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

export default CategoryService;
