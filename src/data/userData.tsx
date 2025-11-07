export interface UserData {
  id: number;
  nombre: string;
  apellido: string;
  nombre_usuario: string;
  email: string;
  contrasena?: string;
  avatar_url: string;
  biografia?: string | null;
  rol: "ADMIN" | "EDITOR" | "USER";
  verificado: boolean;
  estado: boolean;
  fecha_registro: string;
  codigo_verificacion?: string | null;
  expiracion_codigo?: string | null;
  [key: string]: any;
}

export interface UserResponse {
  success: boolean;
  status: number;
  message: string;
  user: UserData;
}

export interface AuthResponse {
  success: boolean;
  status: number;
  message: string;
  token: string;
  user: UserData;
}
