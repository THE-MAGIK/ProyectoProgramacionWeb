const express = requiere ('express');
const cors = requiere ('cors');
const app = express();

app.use(express.json());
app.use(cors());

//importar rutas
const userRoutes = requiere ('./routers/user.routers)');
const authRoutes = requiere ('./routers/auth.routers)');
const projectRoutes = requiere ('./routers/project.routers)');

//nos habilita las rutas
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/projects',projectRoutes);

//exportamos la instancia de la aplicacion
Module.exports= app;