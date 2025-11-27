import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { CapacitorCookies } from "@capacitor/core";
import ToastService from "../services/ToastService";

const API_URL_DEV = "http://localhost:3000/api/v2";
const API_URL_PROD =
  "https://starwiki-app-backend-f2bxg7a2gxh6gvd3.mexicocentral-01.azurewebsites.net/api/v2";

/* RUTAS QUE REQUIEREN AUTENTICACIÓN */
const AUTH_ROUTES: readonly string[] = [
  /* USUARIOS */
  "/users/getUsers",
  "/users/getUserById",
  "/users/createUser",
  "/users/updateUser",
  "/users/deleteUser",
  "/users/deactivateUser",
  "/users/reactivateUser",

  /* CATEGORÍAS */
  "/categories/createCategory",
  "/categories/updateCategory",
  "/categories/deleteCategory",

  /* POSTS */
  "/posts/createPost",
  "/posts/updatePost",
  "/posts/deletePost",

  /* COMENTARIOS */
  "/comments/getComments",
  "/comments/getCommentById",
  "/comments/post",
  "/comments/createComment",
  "/comments/updateComment",
  "/comments/deleteComment",
];

/* Crear instancia de axios */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL_PROD,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* INTERCEPTOR DE SOLICITUDES (REQUEST)  */
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const requiresAuth = AUTH_ROUTES.some((route) =>
      config.url?.includes(route)
    );

    if (requiresAuth) {
      // Buscar el token en cookies
      let token = Cookies.get("token");

      if (!token) {
        // Buscar también en Capacitor (modo móvil)
        const cookieData = await CapacitorCookies.getCookies();
        token = cookieData?.token;
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn(
          " No hay token disponible para ruta protegida:",
          config.url
        );
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* INTERCEPTOR DE RESPUESTAS (RESPONSE) */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      // Mostrar mensajes según el tipo de error
      if (status === 401) {
        ToastService.error("No autorizado. Inicia sesión nuevamente.");
      } else if (status === 403) {
        ToastService.error("Acceso denegado. No tienes permisos.");
      } else if (status >= 500) {
        ToastService.error("Error en el servidor. Intenta más tarde.");
      }
    } else {
      ToastService.error("Error de conexión con el servidor.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
