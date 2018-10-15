import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatId;
  chat$;
  val;

  constructor(public cs: ChatService, private route: ActivatedRoute) {}

  ngOnInit() {
    const chatId = this.route.snapshot.paramMap.get('id');
    const chat = this.cs.get(chatId);
    this.chat$ = this.cs.joinUsers(chat);
    this.scrollBottom();
  }

  submit(chatId) {
    if (!this.val) {
      return alert('you need to enter something');
    }
    this.cs.sendMessage(chatId, this.val);
    this.val = '';

    this.scrollBottom();
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  scrollBottom() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 500);
  }
}
