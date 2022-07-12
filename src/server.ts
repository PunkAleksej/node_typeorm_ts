import app from './app';
import config from './config';
import { connect } from './db/dataSource';

(async () => {
  await connect();
  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    return console.log(`Express is listening on port ${config.port}`);
  });
})();
