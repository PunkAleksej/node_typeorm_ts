"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'fusion',
    database: 'testdb',
    synchronize: true,
    logging: false,
    entities: [User_1.User],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=dataSource.js.map