import { create } from "zustand";
import AuthService from "../services/AuthService";
import { UserData } from "../data/userData";

interface AuthState {
  user: UserData | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoggedIn: boolean;

  // Actions
  register: (
    nombre: string,
    apellido: string,
    nombre_usuario: string,
    email: string,
    contrasena: string
  ) => Promise<void>;
  login: (email: string, contrasena: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setUser: (user: UserData | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  isAuthenticated: false,
  isAdmin: false,
  isLoggedIn: false,

  // REGISTER
  register: async (
    nombre: string,
    apellido: string,
    nombre_usuario: string,
    email: string,
    contrasena: string
  ) => {
    try {
      set({ loading: true });
      const response = await AuthService.register({
        nombre,
        apellido,
        nombre_usuario,
        email,
        contrasena,
      });
      if (response.success) {
        console.log("Registro exitoso"); // Quitar
      }
    } catch (error: any) {
      console.error("Error en el registro (store): ", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // LOGIN
  login: async (email: string, contrasena: string) => {
    try {
      set({ loading: true });
      const response = await AuthService.login({ email, contrasena });

      if (response.success && response.token) {
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
          isAdmin: response.user?.role === "ADMIN",
          isLoggedIn: true,
        });
      }
    } catch (error: any) {
      console.error("Error en login (store):", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // LOGOUT
  logout: async () => {
    try {
      await AuthService.logout();
    } finally {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isAdmin: false,
        isLoggedIn: false,
      });
    }
  },

  //  Verifica si ya hay sesión activa
  checkAuth: async () => {
    const token = await AuthService.getToken();
    const user = await AuthService.getUserData();

    set({
      token,
      user,
      isAuthenticated: !!token,
      isAdmin: user?.role === "ADMIN",
      isLoggedIn: !!token,
    });
  },

  // Permite actualizar manualmente el usuario
  setUser: (user) => set({ user }),
}));
