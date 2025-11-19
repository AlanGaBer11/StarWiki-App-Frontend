import { create } from "zustand";
import CategoryService from "../services/CategoryService";
import {
  CategoryData,
  CategoryResponse,
  CategoriesResponse,
} from "../data/categoryData";

interface CategoryState {
  categories: CategoryData[];
  selectedCategory: CategoryData | null;
  loading: boolean;
  error: string | null;

  // Acciones principales
  fetchCategories: (page?: number, limit?: number) => Promise<void>;
  fetchCategoryById: (id: number) => Promise<void>;
  fetchCategoryByName: (nombre: string) => Promise<void>;
  createCategory: (categoryData: {
    nombre: string;
    descripcion: string;
  }) => Promise<void>;
  updateCategory: (
    id: number,
    categoryData: { nombre: string; descripcion: string }
  ) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  clearError: () => void;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,

  /* Obtener todas las categorias */
  fetchCategories: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const data: CategoriesResponse = await CategoryService.getAllCategories(
        page,
        limit
      );
      set({ categories: data.categories, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Error al cargar las categorias",
        loading: false,
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /* Obtener categoria por ID*/
  fetchCategoryById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const data: CategoryResponse = await CategoryService.getCategoryById(id);
      set({ selectedCategory: data.category || null, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error al cargar la categoria" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /* Obtener categoria por nombre */
  fetchCategoryByName: async (nombre: string) => {
    set({ loading: true, error: null });
    try {
      const data: CategoryResponse = await CategoryService.getCategoryByName(
        nombre
      );
      set({ selectedCategory: data.category || null, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error al buscar la categoria" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /* Crear categoria */
  createCategory: async (categoryData) => {
    set({ loading: true, error: null });
    try {
      await CategoryService.createCategory(categoryData);
      await get().fetchCategories(); // Refrescar la lista de categorias
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error al crear la categoria" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /* Actualizar categoria */
  updateCategory: async (id: number, categoryData) => {
    set({ loading: true, error: null });
    try {
      await CategoryService.updateCategory(id, categoryData);
      await get().fetchCategories(); // Refrescar la lista de categorias

      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error al actualizar la categoria" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /* Eliminar categoria */
  deleteCategory: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await CategoryService.deleteCategory(id);
      set({
        categories: get().categories.filter((c) => c.id !== id),
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message || "Error al eliminar la categoria" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /* Limpiar error */
  clearError: () => set({ error: null }),
}));
