module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  port: '5434',
  password: 'docker',
  database: 'gympoint',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
