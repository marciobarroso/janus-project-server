import restify from 'restify';
import corsMiddleware from 'restify-cors-middleware';

import Router from 'core/Router';
import ErrorHandler from 'core/middlewares/ErrorHandler';
import ResponseHeaders from 'core/middlewares/ResponseHeaders';
import Settings from 'core/Settings';

const App = () => {

  const server = restify.createServer({
    name: Settings.get('app.name'),
    version: Settings.get('app.version'),
    url: `${Settings.get('app.ip')}:${Settings.get('app.port')}`
  });

  const allowedHeaders = [
    'content-type',
    'country',
    'language',
    'access-token'
  ];

  const cors = corsMiddleware({
    allowHeaders: allowedHeaders,
    exposeHeaders: allowedHeaders,
    origins: ['https://*']
  });

  server.pre(cors.preflight);
  server.use(cors.actual);
  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.dateParser());
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());
  server.use(restify.plugins.urlEncodedBodyParser());
  server.use(restify.plugins.gzipResponse());
  server.use(ResponseHeaders);

  server.on('restifyError', ErrorHandler);

  Router.applyRoutes(server);

  server.listen(Settings.get('app.port'), function () {
    console.log('%s listening at %s', server.name, `${Settings.get('app.ip')}:${Settings.get('app.port')}`);
  });
}

export default App;
