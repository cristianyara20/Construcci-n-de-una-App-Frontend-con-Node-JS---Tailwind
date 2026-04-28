// Este tipo representa un usuario completo recibido desde la API
export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Este tipo representa los datos que se envian al crear (POST) o actualizar (PUT) un usuario
export type UserPayload = {
  name: string;
  email: string;
  age: number;
}

// Este tipo representa la estructura general de respuesta de la API. El generico es una <T>
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
}
