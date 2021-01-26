module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "saad",
  DB: "pharma",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
