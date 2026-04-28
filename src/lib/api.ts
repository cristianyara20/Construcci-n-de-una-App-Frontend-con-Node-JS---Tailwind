// URL que usara el frontend para consultar usuarios
export const USERS_API_URL = process.env.NEXT_PUBLIC_USER_API_URL ?? "/api/users";

//Normaliza errores desconocidos para mostrarlos en el form
export function getApiErrorMessage(error: unknown){
    if (error instanceof Error) {
        return error.message;
    }
    return "Ocurrio un error inesperado";
}