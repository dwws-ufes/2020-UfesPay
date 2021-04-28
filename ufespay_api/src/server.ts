import { PlatformExpress } from '@tsed/platform-express';
import 'dotenv/config';
import '@tsed/platform-express'; 
import '@tsed/swagger';
import '@tsed/typeorm';
import '@tsed/passport';
import { $log, PlatformApplication, Request, Response } from '@tsed/common';
import { Configuration, Inject } from '@tsed/di';
import bodyParser from 'body-parser';
import cors from 'cors';
import typeormConfig from './ormconfig.json';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';

export const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ['application/json'],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, 
  lo1gger: {
      debug : true,
      level : "debug",
      disableRoutesSummary: false,
  },
  typeorm: [typeormConfig as any],
  // search all controllers under a directories to endpoint below
  mount: {
    '/': [`${rootDir}/controllers/**/*.ts`],
  },
  componentsScan: [
    `${rootDir}/security/*.ts` // scan protocols directory
  ],
})  


export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  //load middlewares
  $beforeRoutesInit(): void {
      this.app
        .use(cors())
        .use(bodyParser.json())
        .use(methodOverride())
        .use(cookieParser())
        .use(
          bodyParser.urlencoded({
            extended: true,
          }),
        );
    }
}

//function to load server config
async function bootstrap() {
    try {
      $log.debug('Start server...');
      const platform = await PlatformExpress.bootstrap(Server);
  
      await platform.listen();

      $log.debug('Server listeing at port ' + platform.settings.port);
    } catch (er) {
      $log.error(er);
    }
  }
  
  // call function to load server
bootstrap(); 
