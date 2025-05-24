// Importación de módulos de Angular y Material necesarios para formularios, UI y validaciones
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { UsersService } from 'app/services/users/users.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-modal-create-user', // selector para usar el componente
    standalone: true, // indica que es un componente independiente
    imports: [ // módulos necesarios para este componente
        CommonModule, FormsModule, MatIconModule, MatButtonModule, MatSelectModule,
        MatIconModule, MatFormFieldModule, MatInputModule,
        MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
        ReactiveFormsModule
    ],
    templateUrl: './modal-create-user.component.html',
    styleUrl: './modal-create-user.component.scss'
})
export class ModalCreateUserComponent implements OnInit {

    // Formulario de creación de usuario
    formCreateUser!: FormGroup;

    // Lista para almacenar administradores disponibles
    administratorValues: any[] = [];

    // Bandera para mostrar/ocultar el campo de administrador
    showFieldAdministrator: Boolean = false;

    // Usuario actualmente logueado
    loggedUser: any = null;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any, // datos que recibe el modal al abrirse
        private readonly _formBuilder: FormBuilder,
        private readonly _userService: UsersService,
        private readonly _dialogRef: MatDialogRef<ModalCreateUserComponent>,
        private readonly _snackBar: MatSnackBar,
    ) {
        // Inicializa el formulario
        this.createFormUsers();

        // Verifica si las contraseñas coinciden al cambiar el campo "confirmPassword"
        this.formCreateUser.controls['confirmPassword'].valueChanges.pipe(
            debounceTime(1000), // espera antes de reaccionar al cambio
            distinctUntilChanged() // solo si el valor realmente cambia
        ).subscribe((value) => {
            this.validatePassword(value);
        });

    }

    ngOnInit(): void {
        this.getAllAdministrator(); // Carga los administradores

        // Recupera al usuario logueado desde localStorage
        const userString = localStorage.getItem('user');
        if (userString) {
            this.loggedUser = JSON.parse(userString);
            // Prellena el campo "administrator" si aplica
            this.formCreateUser.patchValue({
                administrator: this.loggedUser.id
            });
        }
    }

    // Inicializa los campos del formulario con validaciones
    createFormUsers() {
        this.formCreateUser = this._formBuilder.group({
            nombre: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            role: ['', [Validators.required]],
            administrator_id: ['']
        });
    }

    // Consulta todos los administradores del backend
    getAllAdministrator() {
        this._userService.getAllAdministrator().subscribe({
            next: (res) => {
                this.administratorValues = res.users;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    // Cambia la visibilidad del campo de administrador según el rol elegido
    onChangeRole(event: any) {
        if (event.value === '1') {
            this.hideAdministratorField();
        } else {
            this.showAdministratorField(); // muestra el campo de administrador
        }
    }

    // Envía los datos del formulario al backend
    onSubmit() {

        if (this.formCreateUser.invalid) {
            Swal.fire('Error', 'Por favor completa todos los campos', 'error');
            return;
        }

        const userDataInformation = {
            name: this.formCreateUser.get('nombre')?.value,
            email: this.formCreateUser.get('email')?.value,
            password: this.formCreateUser.get('password')?.value,
            rol_id: Number(this.formCreateUser.get('role')?.value),
            administrator_id: this.formCreateUser.get('administrator_id')?.value 
        };
        console.log(userDataInformation);

        this._userService.createUser(userDataInformation).subscribe({
            next: (Response) => {
                this._snackBar.open(Response.message, 'Cerrar', { duration: 5000 });
                this.formCreateUser.reset();
                this._dialogRef.close(true);
            },
            error: (error) => {
                const errorMesage = error.error?.result || 'Ocurrio un error inesperado. Por favor intenta de nuevo.';
                this._snackBar.open(error.message, 'Cerrar', { duration: 5000 });
            }
        });
    }

    // Verifica si las contraseñas coinciden
    private validatePassword(confirmPassword: string) {
        const password = this.formCreateUser.get('password')?.value;
        if (password !== confirmPassword) {
            this.formCreateUser.get('confirmPassword')?.setErrors({ invalid: true });
        } else {
            this.formCreateUser.get('confirmPassword')?.setErrors(null);
        }
    }

    // Muestra el campo de administrador y lo hace requerido
    private showAdministratorField() {
        this.showFieldAdministrator = true;
        this.formCreateUser.get('administrator_id')?.setValidators([Validators.required]);
        this.formCreateUser.get('administrator_id')?.updateValueAndValidity();
    }

    // Oculta el campo de administrador y remueve validaciones
    private hideAdministratorField() {
        this.showFieldAdministrator = false;
        this.formCreateUser.get('administrator_id')?.clearValidators();
        this.formCreateUser.get('administrator_id')?.updateValueAndValidity();
    }
}
