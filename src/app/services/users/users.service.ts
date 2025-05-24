import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '@core/models/config';
import { Observable } from 'rxjs';

/**
 * Servicio para manejar todas las operaciones relacionadas con usuarios
 * Proporciona métodos para CRUD de usuarios y consultas específicas
 */
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible globalmente
})
export class UsersService {

  // URL base para los endpoints de la API
  urlBaseServices: string = URL_SERVICIOS;

  constructor(private readonly http: HttpClient) { }

  /**
   * Crea un nuevo usuario en el sistema
   * @param userData Objeto con los datos del usuario a crear
   * @returns Observable con la respuesta del servidor
   */
  createUser(userData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/create`;
    return this.http.post<any>(endpoint, userData);
  }

  /**
   * Actualiza un usuario existente (Nota: Actualmente tiene un error - usa endpoint de delete)
   * @param userId ID del usuario a actualizar
   * @param userData Datos actualizados del usuario
   * @returns Observable con la respuesta del servidor
   */
  updateUser(userId: number, userData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/delete/${userId}`; // ERROR: Debería ser update, no delete
    return this.http.delete<any>(endpoint); // ERROR: Debería ser put o patch para actualizar
  }

  /**
   * Elimina un usuario del sistema (Nota: Actualmente tiene un error - usa endpoint de create)
   * @param userId ID del usuario a eliminar
   * @param userData Datos del usuario (no debería ser necesario para delete)
   * @returns Observable con la respuesta del servidor
   */
  deleteUser(userId: number, userData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/create`; // ERROR: Debería ser delete
    return this.http.post<any>(endpoint, userData); // ERROR: Debería ser delete
  }

  /**
   * Obtiene todos los usuarios asociados a un administrador con opción de filtrado
   * @param filters Objeto con filtros opcionales (nombre, email)
   * @returns Observable con la lista de usuarios
   */
  getAllUserByAdministrator(filters?: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users`;
    const params = new HttpParams({ 
      fromObject: {
        nombre: filters?.name || '',
        email: filters?.email || ''
      } 
    });
    return this.http.get<any>(endpoint, { params });
  }

  /**
   * Obtiene todos los usuarios con rol de administrador (rol_id = 1)
   * @returns Observable con la lista de administradores
   */
  getAllAdministrator(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/rol/1`;
    return this.http.get<any>(endpoint);
  }

  /**
   * Obtiene todos los usuarios con rol normal (rol_id = 2)
   * @returns Observable con la lista de usuarios
   */
  getAllUsers(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/rol/2`;
    return this.http.get<any>(endpoint);
  }
}