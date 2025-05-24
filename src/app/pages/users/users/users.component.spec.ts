// Importaciones necesarias para las pruebas
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';

/**
 * Suite de pruebas para el UsersComponent
 * Describe un conjunto de pruebas relacionadas con el componente de usuarios
 */
describe('UsersComponent', () => {
  // Variables para almacenar el componente y su fixture
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  /**
   * Configuración inicial antes de cada prueba
   * Se ejecuta antes de cada it() en este describe
   */
  beforeEach(async () => {
    // Configura el módulo de pruebas
    await TestBed.configureTestingModule({
      imports: [UsersComponent]  // Importa el componente a probar
    })
    .compileComponents();  // Compila el componente y su template

    // Crea una instancia del componente
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    
    // Dispara la detección de cambios inicial
    fixture.detectChanges();
  });

  /**
   * Prueba básica de existencia
   * Verifica que el componente se crea correctamente
   */
  it('should create', () => {
    // Expectativa: el componente debe existir (ser truthy)
    expect(component).toBeTruthy();
  });
});