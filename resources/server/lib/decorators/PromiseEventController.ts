import { CBSignature } from '../PromiseNetEvents/promise.types';
import { Runtime } from 'inspector';
import * as process from 'process';

export interface PromiseEventData {
  eventName: string;
  key: string;
  descriptor: PropertyDescriptor;
  tgt: Object;
}

export default function PromiseEventController() {
  return function <T extends { new (...args: any[]): any }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);

        if (!Reflect.hasMetadata('events', this)) {
          Reflect.defineMetadata('events', [], this);
        }

        const events: PromiseEventData[] = Reflect.getMetadata('events', this);

        for (const { tgt, key, eventName, descriptor } of events) {
          this[] = this[event.key].bind(this);
        }
      }
    };
  };
}
