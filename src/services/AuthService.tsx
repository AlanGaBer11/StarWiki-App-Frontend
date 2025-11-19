import { CapacitorCookies } from "@capacitor/core";
import Cookies from "js-cookie";
import apiClient from "../router/Interceptor";
import { UserData, AuthResponse } from "../data/userData";

interface CookieMap {
  [key: string]: string;
}

const isNative = (): boolean => {
  try {
    const platform = (window as any).Capacitor?.getPlatform?.();
    return platform === "ios" || platform === "android";
  } catch {
    return false;
  }
};

const AuthService = {
  authListeners: [] as (() => void)[],

  // Función auxiliar para normalizar cookies
  parseCookies(cookies: any): CookieMap {
    return typeof cookies === "string"
      ? (JSON.parse(cookies) as CookieMap)
      : (cookies as CookieMap);
  },

  onAuthChange(callback: () => void) {
    this.authListeners.push(callback);
    return () => {
      this.authListeners = this.authListeners.filter((cb) => cb !== callback);
    };
  },

  notifyAuthChange() {
    this.authListeners.forEach((callback) => callback());
  },

  async register(userData: {
    nombre: string;
    apellido: string;
    nombre_usuario: string;
    email: string;
    contrasena: string;
  }) {
    try {
      const response = await apiClient.post("/auth/register", userData);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },

  async login(credentials: {
    email: string;
    contrasena: string;
  }): Promise<AuthResponse> {
    try {
      const response = await apiClient.post("/auth/login", credentials);
      if (response.data.token) {
        await this.saveToken(response.data.token, response.data.user);
        this.notifyAuthChange();
      }
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  },
  async sendVerificationCode(email: string) {
    try {
      const response = await apiClient.post(
        "/auth/send-verification-code",
        email
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async verifyAccount(data: { email: string; code: string }) {
    try {
      const response = await apiClient.post("/auth/verify-account", data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async resetPassword(data: {
    email: string;
    code: string;
    nesPassword: string;
  }) {
    try {
      const response = await apiClient.post("/auth/reset-password", data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  //Guarda token y usuario en cookies (web o nativo)
  async saveToken(token: string, userData?: UserData) {
    if (isNative()) {
      await CapacitorCookies.setCookie({
        key: "token",
        value: token,
      });

      if (userData) {
        await CapacitorCookies.setCookie({
          key: "user",
          value: JSON.stringify(userData),
        });
      }
    } else {
      Cookies.set("token", token, { expires: 1, path: "/" });
      if (userData) {
        Cookies.set("user", JSON.stringify(userData), {
          expires: 1,
          path: "/",
        });
      }
    }
    this.notifyAuthChange();
  },

  // Verifica si el usuario está autenticado
  async isAuthenticated(): Promise<boolean> {
    if (isNative()) {
      const { cookies } = await CapacitorCookies.getCookies({});
      const cookieMap = this.parseCookies(cookies);
      return !!cookieMap["token"];
    }
    return !!Cookies.get("token");
  },

  // Verifica si el usuario es administrador
  async isAdmin(): Promise<boolean> {
    const user = await this.getUserData();
    return user?.rol === "ADMIN";
  },

  // Cerrar sesión (eliminar cookies)
  async logout() {
    if (isNative()) {
      await CapacitorCookies.deleteCookie({ key: "token" });
      await CapacitorCookies.deleteCookie({ key: "user" });
    } else {
      Cookies.remove("token", { path: "/" });
      Cookies.remove("user", { path: "/" });
    }
    this.notifyAuthChange();
  },

  // Obtener token
  async getToken(): Promise<string | null> {
    if (isNative()) {
      const { cookies } = await CapacitorCookies.getCookies({});
      const cookieMap = this.parseCookies(cookies);
      return cookieMap["token"] || null;
    }
    return Cookies.get("token") || null;
  },

  async getUserData(): Promise<UserData | null> {
    if (isNative()) {
      const { cookies } = await CapacitorCookies.getCookies({});
      const cookieMap = this.parseCookies(cookies);
      const userStr = cookieMap["user"];
      return userStr ? JSON.parse(userStr) : null;
    }
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null;
  },

  async getUserName(): Promise<string> {
    const user = await this.getUserData();
    return user?.nombre_usuario || "Usuario de StariWiki";
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

export default AuthService;
