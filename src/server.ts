import app from './app';
import config from './config';
import errorHandler from './middlewares/errorHandler';
import { connect } from './db/dataSource';

(async () => {
  await connect();
  app.use(errorHandler);
  app.listen(config.port, () => {
    return console.log(`Express is listening at http://localhost:${config.port}`);
  });
})();
