import { Sequelize } from 'sequelize-typescript';
import { Cat } from '../cats/cat.entity';
import { databaseConfig } from '../../shared/index';

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
          case 'prod':
          case 'production':
              config = databaseConfig.production;
          case 'dev':
          case 'development':
              config = databaseConfig.development;
          default:
              config = databaseConfig.development;
      }

      const sequelize = new Sequelize(config);
      sequelize.addModels([Cat]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
