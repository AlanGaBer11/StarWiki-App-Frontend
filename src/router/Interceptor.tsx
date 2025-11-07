import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { Capacitor, CapacitorCookies } from "@capacitor/core";
import AuthService from "../services/AuthService";
import ToastService from "../services/ToastService";

const API_URL_DEV = "http://localhost:3000/api/v2";

/* RUTAS QUE REQUIEREN AUTENTICACIÓN (INICIO DE SESIÓN OBLIGATORIO) */
const AUTH_ROUTES: readonly string[] = [
  /* USUARIOS */
  "/users/getUsers", // ADMIN
  "/users/getUserById", // ADMIN, EDITOR, USER
  "/users/createUser", // ADMIN
  "/users/updateUser", // ADMIN, EDITOR, USER
  "/users/deleteUser", // ADMIN
  "/users/deactivateUser", // ADMIN
  "/users/reactivateUser", // ADMIN

  /* CATEGORÍAS */
  "/categories/createCategory", // ADMIN, EDITOR
  "/categories/updateCategory", // ADMIN, EDITOR
  "/categories/deleteCategory", // ADMIN

  /* POSTS */
  "/posts/createPost", // ADMIN, EDITOR
  "/posts/updatePost", // ADMIN, EDITOR
  "/posts/deletePost", // ADMIN, EDITOR

  /* COMENTARIOS */
  "/comments/createComment", // ADMIN, EDITOR, USER
  "/comments/updateComment", // ADMIN, EDITOR, USER
  "/comments/deleteComment", // ADMIN, EDITOR, USER
];

/* Crear instancia de axios */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL_DEV,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiClient;
