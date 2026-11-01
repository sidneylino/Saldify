require('dotenv').config();

const app = require('./src/app');
const sequelize = require('./config/database');

const PORT = process.env.SERVER_PORT || 3002;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log('Banco conectado com sucesso');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar no banco:', error);
  }
};

startServer();