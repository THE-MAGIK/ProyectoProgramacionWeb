import { CommonModule } from "@angular/common";
import { Component, Inject} from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, MatDialogModule } from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UsersService } from "app/services/users/users.service";

@Component({
    selector: 'app-modal-edit-users',
    standalone: true,
    imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatSelectModule, MatIconModule, MatFormField,
        MatInputModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, ReactiveFormsModule, MatDialogModule],
    templateUrl: './modal-edit-users.component.html',
    styleUrls: ['./modal-edit-users.component.scss']
})
export class ModalEditUsersComponent {

    formUpdateUsers!: FormGroup;
    administratorsValues: any [] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly _formBuilder: FormBuilder,
        private readonly __snackBar: MatSnackBar,
        private readonly _userService: UsersService,
        private readonly _dialogRef: MatDialogRef<ModalEditUsersComponent>
    ) {
        this.updateFormUsers();
        this.getAllAdministrator();
    }

    ngOnInit(){
        if (this.data?.user) {
            this.loadUserData(this.data.user);
        }
    }

    updateFormUsers() {
        this.formUpdateUsers = this._formBuilder.group({
            nombre: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            rol_id: ['', Validators.required],
            administrador_id: ['', Validators.required]
        });
    }

    loadUserData(user: any) {
        this.formUpdateUsers.patchValue({
            nombre: user.nombre,
            email: user.email,
            rol_id: String(user.rol_id),
            administrador_id: user.administrador_id
        });
    }

    getAllAdministrator() {
        this._userService.getAllAdministrator().subscribe({
            next: (res) => {
                this.administratorsValues = res.users;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    updateUser() {
        if (this.formUpdateUsers.valid) {
            const userData = this.formUpdateUsers.value;
            const userId = this.data?.user?.id;

            this._userService.updateUser(userId, userData).subscribe({
                next: (response) => {
                    this.__snackBar.open(response.message, 'Cerrar', { duration: 5000 });
                    this._dialogRef.close(true);
                },
                error: (err) => {
                    const errorMessage = err.error?.result || 'Ocurrio un error inesperado. Por favor, intente de nuevo';
                    this.__snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
                }
            });
        }
    }

}