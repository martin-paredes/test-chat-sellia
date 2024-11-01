import { CommonModule, DatePipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Input, Signal, effect } from '@angular/core';
import { User } from '../../../shared/models/User';
import { ChatService } from '../../../shared/services/chat.service';
import { ChatMessage } from '../../../shared/models/ChatMessage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-chat-window',
    standalone: true,
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.scss'],
    imports: [
        CommonModule, NgIf, NgFor, NgClass, NgStyle, FormsModule, ReactiveFormsModule
    ],
    providers: [
        DatePipe,
    ]
})
export class ChatWindowComponent {
    @Input() userSignal!: Signal<User | null>;

    user: User | null = null;

    messages: ChatMessage[] = [];
    newMessage: string = '';

    sendMessage() {
        if (this.newMessage.trim()) {
            let msg: ChatMessage = this.messages[this.messages.length - 1];
            this.messages.push(
                {
                    ...msg,
                    message: {
                        ...msg.message,
                        text: this.newMessage,
                        typeUser: 'UserSystem',
                    }

                }
            );
            this.newMessage = '';
        }
    }

    constructor(private chatService: ChatService, private datePipe: DatePipe) {
        effect(() => {
            this.user = this.userSignal ? this.userSignal() : null;
            if (this.user) {
                this.getMsgChat();
            }
        });
    }

    ngOnInit(): void { }

    getMsgChat() {
        this.chatService.getMsgUsers(this.user?._id === '629e39e8b2d31319081e0650' ? 1 : 2).subscribe((data) => {
            this.messages = data;
            this.messages.unshift(
                {
                    ...this.messages[0],
                    message: {
                        ...this.messages[0].message,
                        text: 'La conversación cambió de "No asignada" a "Asignada"',
                        typeUser: 'notification',
                    }

                }
            );
            this.messages.forEach((item: ChatMessage) => item.message.createdAt = this.datePipe.transform(item.message.createdAt, 'short'))
        });
    }
}
