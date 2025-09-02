const express = require('express');
const cors = require('cors');
const app = express();
const rutas = require('./rutas/rutas');
require('dotenv').config();


app.use(cors());
app.use(express.json());
app.use('/api', rutas);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));