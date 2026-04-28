import { USERS_API_URL } from "../lib/api";
import { ApiResponse, User, UserPayload } from "@/types/user";

// Funcion generica para hacer peticines HTTP.
//Usa generics (<T>) para que TypeScript conozca el tipo exacto de dato esperado
async function requestn<T>(url: string, init?:RequestInit): Promise<T> {
    const response = await fetch(url, { 
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...init?.headers,
        },
    });
    const text = await response.text();
    const body = text ? JSON.parse(text) : null;

// Si el servidor responde con error HTTP, se lanza una excepcion.
// El hook la capturara para mostrar el mensaje al usuario.
if (!response.ok) {
    throw new Error(
        body?.message ?? `La API respondio con estado ${response.status}.`
    );
}
// La API de ejemplo devuelve un contenedor con success y data.
// Aqui extraemos solamente data para que los componentes reciban datos limpios.
if (body && typeof body === "object" && "success" in body) {
    const apiBody = body as ApiResponse<T>;

    if (!apiBody.success) {
        throw new Error(apiBody.message ?? "La operacion no fue exitosa.");
    }

    return apiBody.data;
}

return body as T;

}


//Servicio centrlizado del recurso Usuarios.
//Asi los componentes no conocen URLs ni metodos HTTP directamente.

export const usersService = {
    //GET /api/users
    getAll(){
        return requestn<User[]>(USERS_API_URL);
    },
    //GET /api/users/:id
    getById(id: string){
        return requestn<User>(`${USERS_API_URL}/${id}`);
    },
    //POST /api/users
    create(payload: UserPayload){
        return requestn<User>(USERS_API_URL, {
            method: "POST",
            body: JSON.stringify(payload),
        }); 
    },
    //PUT /api/users/:id
    update(id: number, payload: UserPayload){
        return requestn<User>(`${USERS_API_URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
        });
    },

    //DELETE /api/users/:id
    delete(id: number){
        return requestn<unknown>(`${USERS_API_URL}/${id}`, {
            method: "DELETE",
        });
    }
}


