import * as httpServer from './serve-http';
import * as volumeManager from './manage-volumes';

httpServer.start();
volumeManager.start();