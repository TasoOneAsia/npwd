import { CBSignature, PromiseEventResp, PromiseRequest } from '../PromiseNetEvents/promise.types';
import PromiseController from '../structs/PromiseController';
import { onNetPromise } from '../PromiseNetEvents/onNetPromise';
import { getSource } from '../../utils/miscUtils';
import { ServerPromiseResp } from '../../../../typings/common';
import { mainLogger } from '../../sv_logger';
import * as events from 'events';
import { eventNames } from 'cluster';
import { PromiseEventData } from './PromiseEventController';

const netEventLogger = mainLogger.child({ module: 'events' });

type WrapperFn<T, P> = (eventName: string) => void;

export function PromiseEvent<T = any, P = any>(eventName: string) {
  return function (tgt: object, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!Reflect.hasMetadata('events', tgt)) {
      Reflect.defineMetadata('events', [], tgt);
    }

    console.dir({
      eventName,
      tgt,
      propertyKey,
      descriptor,
    });

    const netEvents: PromiseEventData[] = Reflect.getMetadata('events', tgt);

    netEvents.push({
      eventName,
      descriptor,
      key: propertyKey,
      tgt,
    });

    Reflect.defineMetadata('events', netEvents, tgt);
  };
}
