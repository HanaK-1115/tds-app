const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: {
        rejectUnauthorized: false,
    },
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to PostgreSQL');
    } catch (err) {
        console.error('PostgreSQL connection error:', err);
    }
};

module.exports = { sequelize, connectToDatabase };