import { PromiseEvent } from '../lib/decorators/PromiseEvent';
import { PromiseRequest } from '../lib/PromiseNetEvents/promise.types';
import { NoteItem } from '../../../typings/notes';
import { ContactEvents } from '../../../typings/contact';
import PromiseController from '../lib/structs/PromiseController';

class TestController extends PromiseController {
  @PromiseEvent(ContactEvents.GET_CONTACTS)
  public ashandleFetchContacts(): any {}
}

export default new TestController('Test');
