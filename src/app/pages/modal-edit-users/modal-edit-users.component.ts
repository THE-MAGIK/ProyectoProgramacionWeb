// Módulos esenciales de Angular para componentes, formularios y lógica común
import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { 
  MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, 
  MatDialogRef, MatDialogTitle, MatDialogModule } from "@angular/material/dialog";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field"; 
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UsersService } from "app/services/users/users.service";

// Decorador que define el componente
@Component({
  selector: 'app-modal-edit-users', // Nombre del selector para usar el componente
  standalone: true, // Indica que no depende de un módulo externo (Standalone Component)
  imports: [ // Módulos que este componente necesita para funcionar
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './modal-edit-users.component.html', // Ruta al HTML del componente
  styleUrls: ['./modal-edit-users.component.scss'] // Estilos asociados
})
export class ModalEditUsersComponent {

  // Formulario reactivo que manejará los datos del usuario a editar
  formUpdateUsers!: FormGroup;

  // Arreglo que almacenará los administradores traídos desde el backend
  administratorsValues: any[] = [];

  // Inyección de dependencias necesarias para el componente
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos recibidos del componente padre (modal)
    private readonly _formBuilder: FormBuilder, // Constructor de formularios reactivos
    private readonly __snackBar: MatSnackBar, // Para mostrar notificaciones tipo toast
    private readonly _userService: UsersService, // Servicio de usuarios (API)
    private readonly _dialogRef: MatDialogRef<ModalEditUsersComponent> // Control del modal (cerrar, etc.)
  ) {
    this.updateFormUsers();       // Inicializa el formulario vacío
    this.getAllAdministrator();   // Carga la lista de administradores
  }

  // Hook del ciclo de vida: se ejecuta al cargar el componente
  ngOnInit() {
    if (this.data?.user) {
      this.loadUserData(this.data.user); // Si hay datos de usuario, precarga en el formulario
    }
  }

  // Método para inicializar el formulario con validadores
  updateFormUsers() {
    this.formUpdateUsers = this._formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol_id: ['', Validators.required],
      administrator_id: ['', Validators.required] // Este campo debe coincidir con los datos que vengan del back
    });
  }

  // Carga los datos del usuario al formulario para editar
  loadUserData(user: any) {
    this.formUpdateUsers.patchValue({
      nombre: user.nombre,
      email: user.email,
      rol_id: String(user.rol_id), // Asegura que sea string para el select
      administrator_id: user.administrator_id // Precarga el administrador actual del usuario
    });
  }

  // Consulta todos los administradores disponibles
  getAllAdministrator() {
    this._userService.getAllAdministrator().subscribe({
      next: (res) => {
        this.administratorsValues = res.users; // Asigna la lista de usuarios con rol administrador
      },
      error: (err) => {
        console.error(err); // Muestra error si falla la consulta
      }
    });
  }

  // Actualiza los datos del usuario con la información del formulario
  updateUser() {
    if (this.formUpdateUsers.valid) {
      const userData = this.formUpdateUsers.value; // Obtiene valores del formulario
      const userId = this.data?.user?.id; // ID del usuario que se va a actualizar

      this._userService.updateUser(userId, userData).subscribe({
        next: (response) => {
          this.__snackBar.open(response.message, 'Cerrar', { duration: 5000 }); // Notificación de éxito
          this._dialogRef.close(true); // Cierra el modal y avisa que se actualizó
        },
        error: (err) => {
          const errorMessage = err.error?.result || 'Ocurrio un error inesperado. Por favor, intente de nuevo';
          this.__snackBar.open(errorMessage, 'Cerrar', { duration: 5000 }); // Notificación de error
        }
      });
    }
  }

}
