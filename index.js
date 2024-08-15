const express = require('express');
const app = express();
const path = require('path');
const toyRoutes = require('./routes/toyRoutes');
const userRoutes = require('./routes/userRoutes');
const homeRoutes = require('./routes/homeRoutes');

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', homeRoutes);
app.use('/toys', toyRoutes);
app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
