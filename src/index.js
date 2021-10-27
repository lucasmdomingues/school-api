import { Environment } from './infra/config/environment.config';
import { Http } from './infra/delivery/http/index.http';
import './infra/repository/mysql/index.mysql';

const http = new Http(Environment.app.port);

http.start();
