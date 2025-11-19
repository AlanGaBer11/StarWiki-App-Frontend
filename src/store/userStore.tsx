import { create } from "zustand";
import UserService from "../services/UserService";
import { UserData, UsersResponse, UserResponse } from "../data/userData";

interface UserState {
  users: UserData[];
  selectedUser: UserData | null;
  loading: boolean;
  error: string | null;

  //Acciones principales
  fetchUsers: (page?: number, limit?: number) => Promise<void>;
  fetchUserById(id: number): Promise<void>;
  createUser: (userData: {
    nombre: string;
    apellido: string;
    nombre_usuario: string;
    email: string;
    contrasena: string;
    rol: "ADMIN" | "EDITOR" | "USER";
  }) => Promise<void>;
  updateUser: (
    id: number,
    userData: {
      nombre: string;
      apellido: string;
      nombre_usuario: string;
      email: string;
      contrasena: string;
      rol: "ADMIN" | "EDITOR" | "USER";
      avatar_url: string;
      biografia: string;
    }
  ) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  deactivateUser: (id: number, code: string) => Promise<void>;
  reactivateUser: (id: number, code: string) => Promise<void>;
  clearError: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null,

  /* Obtener todos los usuarios */
  fetchUsers: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const data: UsersResponse = await UserService.getAllUsers(page, limit);
      set({ users: data.users, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error al cargar los usuarios" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  /* Obtener usuario por ID */
  fetchUserById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const data: UserResponse = await UserService.getUserById(id);
      set({ selectedUser: data.user || null, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error al cargar el usuario" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  /* Crear un usuario */
  createUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      await UserService.createUser(userData);
      await get().fetchUsers(); // Refrescar la lista de usuarios
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error al crear el usuario" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  /* Actualizar un usuario */
  updateUser: async (id: number, userData) => {
    set({ loading: true, error: null });
    try {
      await UserService.updateUser(id, userData);
      await get().fetchUsers(); // Refrescar la lista de usuarios
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error al actualizar el usuario" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  /* Eliminar un usuario */
  deleteUser: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await UserService.deleteUser(id);
      set({ users: get().users.filter((u) => u.id !== id), loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error al eliminar el usuario" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  /* Desactivar un usuario */
  deactivateUser: async (id: number, code: string) => {
    set({ loading: true, error: null });
    try {
      await UserService.deactivateUser(id, code);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error al desactivar el usuario" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  /* Reactivar un usuario */
  reactivateUser: async (id: number, code: string) => {
    set({ loading: true, error: null });
    try {
      await UserService.reactivateUser(id, code);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error al reactivar el usuario" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  /* Limpiar error */
  clearError: () => set({ error: null }),
}));
