import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {ChatService} from '../../_services/chat.service';
import {ChatMessageDto} from '../../_dto/chat-message-dto';

@Component({
  selector: 'app-chat',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './chat.component.html',
  standalone: true,
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {

  //#region VARIABLE


  //#endregion VARIABLE

  constructor(
    private chatService: ChatService,
  ) {
  }

  username: string | null = null;
  usernameInput: string = '';
  messageInput: string = '';
  messages: string[] = [];

  joinChat() {
    if (this.usernameInput.trim()) {
      this.username = this.usernameInput;
      this.chatService.join(this.username)
        .subscribe(value => {

        });
      this.messages.push(`${this.username} a rejoint le chat.`);
    }
  }

  body: ChatMessageDto;
  sendMessage() {
    if (this.messageInput.trim()) {
      this.body = new ChatMessageDto;
      this.body.message = this.messageInput;
      this.body.username = this.usernameInput;

      this.chatService.sendMessage(this.body)
        .subscribe(value => {
        });
      this.messages.push(`${this.username}: ${this.messageInput}`);
      this.messageInput = '';
    }
  }

  @HostListener('window:beforeunload')
  beforeUnloadHandler(): void {
    console.log('reload');
    this.chatService.disconnect(this.usernameInput);
  }

  ngOnDestroy(): void {
    console.log('destroy');
    this.chatService.disconnect(this.usernameInput);
  }

  ngOnInit(): void {
  }
}
