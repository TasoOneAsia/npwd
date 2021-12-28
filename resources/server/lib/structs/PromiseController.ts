import { Logger } from 'winston';
import { mainLogger } from '../../sv_logger';

export default class PromiseController {
  private log: Logger;

  constructor(name: string) {
    this.log = mainLogger.child({ module: name });
  }

  start(): void {
    this.log.info(`${this.constructor.name} module started`);
  }
}
