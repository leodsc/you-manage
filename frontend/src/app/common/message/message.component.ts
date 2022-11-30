import { AfterViewInit, Component, Input, OnInit, Renderer2 } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Message } from './Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewInit {

  @Input()
  name: string;

  visible: boolean = false;
  message: Message = new Message("", "", "info");
  timer = this.startTimer();

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.messageService.addMessenger(this.name);
    this.messageService.messageObservable.subscribe(value => {
      if (this.name === value.id) {
        this.message = new Message(value.message.title, value.message.description, value.message.level);
        if (this.visible) {
          clearTimeout(this.timer);
        }
        this.visible = true;
        this.timer = this.startTimer();
      }
    })
  }

  startTimer() {
    return setTimeout(() => {
      this.visible = false;
    }, this.message.timeout ?? 5000);
  }
}
