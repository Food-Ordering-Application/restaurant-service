module.exports = {
  type: 'postgres',
  host: 'restaurantservicepostgres',
  port: '5432',
  username: 'admin',
  password: 'admin',
  database: 'restaurantservice',
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/**/*.migration.{js,ts}'],
  synchronize: true,
  seeds: [__dirname + '/**/seeders/**/*.seed{.ts,.js}'],
  factories: [__dirname + '/**/factories/**/*.factory{.ts,.js}'],
};
