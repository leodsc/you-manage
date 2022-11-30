import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../common/message/Message';

type Messenger = {
  id: string,
  message: Message
}


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private instances: string[] = [];
  private _message = new BehaviorSubject<Messenger>({id: "", message: new Message("", "", "info")});
  messageObservable = this._message.asObservable(); 

  constructor() { }

  send(id: string, message: Message) {
    this._message.next({
      id: id,
      message: message
    });
  }

  addMessenger(id: string) {
    this.instances.push(id);
    if (this.instances.filter(value => value === id).length > 1) {
      throw new Error(`Two messengers with same name: ${id}`);
    }
  }
}
