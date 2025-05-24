// Módulos de Angular y Material necesarios para la funcionalidad del componente
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersService } from 'app/services/users/users.service';
import { ModalCreateUserComponent } from 'app/pages/modal-create-user/modal-create-user.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditUsersComponent } from 'app/pages/modal-edit-users/modal-edit-users.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

// Interfaz para definir estructura de usuario (solo nombre aquí, pero podría ampliarse)
export interface User {
  name: string;
}

// Decorador que define el componente
@Component({
  selector: 'app-users', // nombre del componente
  standalone: true,      // este componente puede usarse sin estar en un módulo
  imports: [             // módulos que el componente necesita
    CommonModule,
    BreadcrumbComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = [
    'name',
    'email',
    'role',
    'action'
  ];

  // Breadcrumbs para navegación
  breadscrums = [
    {
      title: 'Gestión de usuarios',
      item: [],
      active: 'Datos básicos',
    },
  ];
 
  breadscrumsDetails = [
    { 
      title: '',
    },
  ];

  // Fuente de datos de la tabla
  dataSource = new MatTableDataSource<any>([]);

  // Referencia al paginador de Angular Material
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Configura la paginación después de que la vista se ha inicializado
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Formulario reactivo para filtrar usuarios
  userFormSearchFilter!: FormGroup;
  usersList: any[] = [];

  // Indicador de carga (spinner)
  isLoading = false;

  // Filtros por defecto (vacíos)
  userDefaultFilterSearch: any = {
    name: undefined,
    email: undefined,
  };

  // Inyección de dependencias en el constructor
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly userService: UsersService,
    private readonly dialogModel: MatDialog,
    private readonly _sanckBar: MatSnackBar
  ) { }

  // Se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.createUserFormSearchFilter();             // inicializa el formulario
    this.getAllUserByAdministrator();              // carga usuarios
    this.handleUserFilterChance('name', 'email');  // escucha cambios en filtros
  }

  // Crea el formulario para búsqueda de usuarios
  createUserFormSearchFilter() {
    this.userFormSearchFilter = this._formBuilder.group({
      name: [''],
      email: ['']
    });
  }

  // Convierte el ID del rol en texto legible
  getRoleName(rol_id: number): string {
    switch (rol_id) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Usuario';
      default:
        return 'Desconocido';
    }
  }

  // Escucha cambios en el formulario y filtra usuarios con debounce
  handleUserFilterChance(controlName: string, filterKey: string) {
    this.userFormSearchFilter.get(controlName)?.valueChanges
      .pipe(
        debounceTime(300),        // espera 300ms tras escribir
        distinctUntilChanged()    // ignora si no hay cambios reales
      )
      .subscribe(value => {
        this.userDefaultFilterSearch[filterKey] = value;         // actualiza filtro
        this.getAllUserByAdministrator(this.userDefaultFilterSearch); // vuelve a filtrar
      });
  }

  // Obtiene todos los usuarios (con o sin filtros)
  getAllUserByAdministrator(filters?: any): void {
    console.log('filtros enviados: ', filters);
    this.isLoading = true;
    this.userService.getAllUserByAdministrator(filters).subscribe({
      next: (response) => {
        this.usersList = response.users;          // guarda usuarios en lista local
        console.log('Listando : ', this.usersList);
        this.dataSource.data = response.users;    // los pone en la tabla
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }
    });
  }

  // Abre modal para crear nuevo usuario
  openModalCreateUser(): void {
    const dialogRef = this.dialogModel.open(ModalCreateUserComponent, {
      width: '600px',
      disableClose: true,
    });

    // Si se cierra el modal y se creó el usuario, se recarga la tabla
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'created') {
        this.getAllUserByAdministrator();
        this._sanckBar.open('Usuario creado exitosamente', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  // Abre modal para editar un usuario existente
  openModalUpdateUser(user: any): void {
    const dialogRef = this.dialogModel.open(ModalEditUsersComponent, {
      width: '600px',
      disableClose: true,
      data: user // pasa datos del usuario al modal
    });

    // Si el usuario fue actualizado, recarga tabla
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.getAllUserByAdministrator();
        this._sanckBar.open('Usuario actualizado correctamente', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  // Abre modal de confirmación para eliminar usuario
  openModalDeleteUser(id: number) {
    const dialogRef = this.dialogModel.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Usuario',
        message: '¿Estás seguro de que deseas eliminar este usuario?'
      }
    });

    // Si se confirma, muestra mensaje por consola (lógica de eliminación aún pendiente)
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        console.log('Usuario eliminado con ID:', id);
        // Aquí deberías hacer la llamada al servicio para eliminar realmente
      }
    });
  }

}
