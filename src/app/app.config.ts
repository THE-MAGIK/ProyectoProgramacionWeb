// Importa la interfaz que define la configuración principal de una aplicación Angular
import { ApplicationConfig } from '@angular/core';

// Importa el proveedor para habilitar animaciones asincrónicas, mejorando el rendimiento
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Importa la función para configurar PrimeNG globalmente
import { providePrimeNG } from 'primeng/config';

// Importa el tema visual 'Aura' desde los temas oficiales de PrimeNG
import Aura from '@primeng/themes/aura';

// Define la configuración principal de la aplicación Angular
export const appConfig: ApplicationConfig = {
    providers: [
        // Habilita animaciones cargadas de forma asincrónica
        provideAnimationsAsync(),

        // Configura PrimeNG para usar el tema 'Aura'
        providePrimeNG({ 
            theme: {
                preset: Aura // Establece el tema visual de la aplicación
            }
        })
    ]
};
