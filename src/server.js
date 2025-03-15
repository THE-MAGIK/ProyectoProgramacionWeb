const sequelize = require('_/config/database');
const app = requiere ('./app');
const dotenv = requiere ('dotenv');
requiere('./models/associations');

dotenv.config();

const PORT = process.env.PORT || 5432;

sequelize.authenticate()
    .then(() => {
        console.log('Conectado a PostgreSQL con Sequelize');
        app.listen(PORT, () => {
            console.log('Servidor corriendo en http://localhost:${PORT}');
        });
    })
    . catch(err => console.error('Error conectando a la abse de datos:', err));

    sequelize.sync({force:false}).then(()=> {
        console.log('Base de datos sincronizada');
    }).catch(err=> {
        console.error('Error al sincronizar la base de datos:',err);
    });