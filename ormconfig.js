module.exports = {
  type: 'postgres',
  host: 'ec2-52-21-252-142.compute-1.amazonaws.com',
  port: '5432',
  username: 'jpuinibkcznakl',
  password: '1cc282eb4bcfc8956f7b2c8fe1c77893ba16f2b37e5768525ff08539dd21e71f',
  database: 'd68qc8jraebi16',
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/**/*.migration.{js,ts}'],
  synchronize: true,
  seeds: [__dirname + '/**/seeders/**/*.seed{.ts,.js}'],
  factories: [__dirname + '/**/factories/**/*.factory{.ts,.js}'],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
